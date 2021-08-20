//IMPORTS
const express = require("express"); 
const body_parser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet"); 
const sequelize = require("./config/connection"); //import db connection
const PORT = process.env.PORT || 3000;

//IMPORTS MODELS
const Products = require("./models/products");
const Users = require("./models/users");

//APP
const app = express();

app.use(cors());
app.use(helmet());
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
   
    ///Funciona, pero si el id no existe o esta vacio no hace nada ni devuelve error.
/*app.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const objectToUpdate = {
        name: 'New product',
        price: 10,
        description:'New description'
        }
    try {
        Products.update(objectToUpdate, { where: { id: id}})
        res.status(200).send({msg: `Product's name was updated`});

    }catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }

});*/

//USERS

//NEW USER
/*app.post("/users", async (req, res) => {
    let id = req.body.id
    let first_name = req.body.first_name
    let last_name= req.body.last_name
    let email = req.body.email
    
    try {
        const foundUser = await Users.findOne({where: {id:id}});
        if (!foundUser) {
        // User not found, create a new one
            const newUser = await Users.create({
                first_name: first_name,
                last_name: last_name,
                email: email
            })
            res.status(200).send({msg:'New user created successfully', newUser});  
        } else{
            res.status(404).send({msg: `This user already exist`});
        }
    }catch (error) {
        res.status(400).send({msg:'Something happened ' + error});  
    }
});*/











//SERVER
app.listen(PORT, () => {
    console.log(`Server started to listen in port ${PORT}`);
});
   
