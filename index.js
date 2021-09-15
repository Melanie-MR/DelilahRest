require("dotenv").config()

//IMPORTS
const express = require("express"); 
const bcrypt = require("bcryptjs"); 
const jsonwebtoken = require("jsonwebtoken")
const body_parser = require("body-parser");
const cors = require("cors"); 
const sequelize = require("./config/connection"); //import db connection
const PORT = process.env.PORT || 3000;



//IMPORTS MODELS
const Products = require("./models/products");
const Users = require("./models/users");
const Orders = require("./models/orders");
const OrderProducts = require("./models/order_products");

//Para probar la conexion de la base de datos sin endpoint
//const orders = OrderProducts.findAll().then(a =>
//    console.log("as",a)
//);

//APP
const app = express();

app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//ENDPOINTS

//Read ALL products.
app.get('/products', authUser, async (req, res) => {
    try {
        const products =  await Products.findAll()
        res.status(200).send({msg:'These are all the products', products});  
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});

//Read one product.
app.get("/products/:id", authUser, async (req, res) => {
    let id = req.params.id
    try {
        const products =  await Products.findOne({
            where: {
               id: id  
            }
        }) 
        if (products == null) {
            res.status(404).send({msg: `There is not products with this id ${id}`})
        } else {
            res.status(200).send({msg:`This is the product with the id ${id}`, products}); 
        }
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});

//Create product
app.post("/products", authUser, isAdmin, async (req, res) => {
    let name = req.body.name
    let price = req.body.price
    let description = req.body.description
    
    try {
        const newProduct = await Products.create({
            name: name,
            price: price,
            description: description
        })
        res.status(200).send({msg:'Product created successfully', newProduct});  
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});

//Delete product by id
app.delete("/products/:id", authUser, isAdmin, async (req, res) => { 
    let id = req.params.id
    try {
        const status =  await Products.destroy({
            where: {
               id: id  
            }
        }) 
        if (status == 0) {
            res.status(404).send({msg: `There is not products with the id ${id} to be eliminated`})
        } else {
            res.status(200).send({msg: "DELETED"});
        }
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});


//Update product
app.put("/products/:id", authUser, isAdmin, async  (req, res) => {  
    const id = req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;

    const objectToUpdate = {
        name: name,
        price: price,
        description: description
    }
    // First try to find the record
    try {
        const foundItem = await Products.findOne({where: {id:id}});
        if (!foundItem) {
        // Item not found, create a new one
            const newProduct = await Products.create({
                name: name,
                price: price,
                description: description
            })
            res.status(200).send({msg:'Product created successfully', newProduct});  
        } else{
        // Found an item, update it
            Products.update(objectToUpdate, { where: { id: id}})
            res.status(200).send({msg: `Product's name was updated`});
        }
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});


//ORDERS
//Create order
app.post("/order", authUser, async (req, res) => {
    let productsId = req.body.productsId; // array [1,2,3]
    let address = req.body.address; // string 123 evergreen
    let payment_method = req.body.payment_method; //'cash', 'credit_card', 'debit_card'
    let user_id = req.user.id;

    if (productsId == '' || address == '' || payment_method == ''){
        res.status(400).send({msg:'One or more mandatory fields are empty'});
    }
    
    try {
        //Que los productos existan
        //Obtener la info de los productos
        let productsList = JSON.parse(productsId);
        let products = await Products.findAll({
            where: {
                id: productsList
            }
        })

        // Calcular Total 
        var total = 0.0;
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            total += parseFloat(product.price);
        }
        
        //Crear la orden
        let order = await Orders.create({
            user_id: user_id,
            payment_method: payment_method,
            address: address,
            total: total.toFixed(2)
        });

        let newOrderId = order.id;
        //Crear los order_products
        let newOrderProductList = [];
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            newOrderProduct =  await OrderProducts.create({
                product_id: product.id,
                order_id: newOrderId,
                name: product.name,
                price: product.price
            })
            newOrderProductList.push(newOrderProduct)
            
        }
   
        //Regresar la infomacion de la orden

        const responseObject = {
                                order: order,
                                products: newOrderProductList
                               }
        res.status(200).send({msg:'Order created successfully', res: responseObject});  
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});


//USERS

//NEW USER Crear usuario
app.post('/signup', validateSignup, validateUser, async(req, res) => {

    const username = req.body.username;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const address = req.body.address;
    const password = req.body.password;

    try {
        const newUser = await Users.create({
            username: username,
            fullname : fullname,
            email : email,
            phone_number : phone_number,
            address : address,
            password : bcrypt.hash(password, 5)
        })
        res.status(201).send({msg:'User created successfully', newUser});  
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});


/////////////////// Validate Functions

// Valida Login - Si los datos iniciados son correctos para iniciar sesion.
async function validateLogin(req, res, next){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (username == '' || email == ''){
        res.status(400).send({msg:'Username or email required'});  
    } else if ( password == '') {
        res.status(400).send({msg:'Password required'});  
    }
    let usernameExists = false;
    let emailExists = false;
    if (username) {
        usernameExists = await Users.findOne({where: {username:username}});
    } else if (email) {
        emailExists = await Users.findOne({where: {email:email}});
    }
    

    let registeredUser = null;
    if (usernameExists) {
        registeredUser = usernameExists;
    } else if (emailExists) {
        registeredUser = emailExists;
    } else {
        res.status(400).send({msg:'Username or email not exists'});
    }

    const result = bcrypt.compare(password, registeredUser.password);

    if (result){
        req.user = registeredUser;
        next();
    } else {
        res.status(400).send({msg:'Password incorrect'});  
    }


}
// Info correcta para crear usuario nuevo (campos minimos, restricciones de password)

async function validateSignup(req, res, next){
    if (req.body.username == '' || req.body.fullname == '' || req.body.email == '' ||
        req.body.phone_number == '' || req.body.address == '' || req.body.password == '') {
            
        res.status(400).send({msg:'One or more mandatory fields are empty'});  
    } else if (req.body.password.length < 8){
        res.status(400).send({msg:'Password must have 8 digits'});  

    } else  {
        next()
    }
}

// Verificar que no se cree usuario replicado.
async function validateUser(req, res, next){
    const username = req.body.username;
    const email = req.body.email;

    const usernameExists = await Users.findOne({where: {username:username}});
    const emailExists = await Users.findOne({where: {email:email}});

    if (usernameExists || emailExists){
        res.status(400).send({msg:'Username or email already exists'});  
    } else {
        next()
    }
}

//JWT - Login 
app.post('/auth', validateLogin, (req, res) =>{
    const username = req.body.username;
    const user_id = req.user.id;
    //consu;tar bd y validar que existen tanto username como password
    const user = {id: user_id};
    const accessToken = generateAccessToken(user);
    res.send({
        message: 'Usuario autenticado',
        token: accessToken
    });

})

function generateAccessToken(user){
    return jsonwebtoken.sign(user, process.env.SECRET, {expiresIn: '50m'});
}

// es llamada para verificar que el usuario está logeado
function authUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jsonwebtoken.verify(token, process.env.SECRET);
        if (user) {
            req.user = user;
            return next();
        }
    } catch(err){
        res.status(400).send({message:'Error validating user.', error: err});  
    }
}

// Verifica que el usuario es admin 
async function isAdmin (req, res, next) {
    const username = req.user.username;
    const user = await Users.findOne({where: {username: username}});

    const isAdmin = user.is_admin;
    if (isAdmin == true) { 
        return next();
    } else {
        res.status(400).send({message:'User is not admin', is_admin: isAdmin});
    }
}


////ORDERS
//Read ALL products.
app.get('/orders', async (req, res) => {
    try {
        const orders =  await Orders.findAll()
        res.status(200).send({msg:'This is the order number blabla', orders});  
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});

//SERVER
app.listen(PORT, () => {
    console.log(`Server started to listen in port ${PORT}`);
});
   
