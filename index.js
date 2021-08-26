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

//APP
const app = express();

app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//ENDPOINTS

//Read ALL products.
app.get('/products', async (req, res) => {
    try {
        const products =  await Products.findAll()
        res.status(200).send({msg:'These are all the products', products});  
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});

//Read one product.
app.get("/products/:id", async (req, res) => {
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
app.post("/products", async (req, res) => {
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
app.delete("/products/:id", async (req, res) => {
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


//Create product
app.post("/products", async (req, res) => {
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

//Update product

app.put("/products/:id", async  (req, res) => {  
    const id = req.params.id;
    const name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;

    const objectToUpdate = {
        name: 'Pruebaa',
        price: 15,
        description:'prub'
        }
    // First try to find the record
    try {
        const foundItem = await Products.findOne({where: {id:id}});
        if (!foundItem) {
        // Item not found, create a new one
            const newProduct = await Products.create({
                id:id,
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
    }catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});

//USERS

//NEW USER
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
            password : bcrypt.hashSync(password, 5)
        })
        res.status(201).send({msg:'User created successfully', newUser});  
    } catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});

app.post('/login', validateLogin, (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    

});

/////////////////// Validate Functions

async function validateLogin(req, res, next){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (username == '' || email == ''){
        res.status(400).send({msg:'Username or email required'});  
    } else if ( password == '') {
        res.status(400).send({msg:'Password required'});  
    } 

    const usernameExists = await Users.findOne({where: {username:username}});
    const emailExists = await Users.findOne({where: {email:email}});

    if (usernameExists) {
        const registeredUser = usernameExists;
    } else if (emailExists) {
        const registeredUser = emailExists;
    } else {
        res.status(400).send({msg:'Username or email not exists'});  
    }

    const result = bcrypt.compareSync(password, registeredUser.password);

    if (result){
        next();
    } else {
        res.status(400).send({msg:'Password incorrect'});  
    }


}

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




//SERVER
app.listen(PORT, () => {
    console.log(`Server started to listen in port ${PORT}`);
});
   
