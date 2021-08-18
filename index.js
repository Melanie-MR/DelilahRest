//IMPORTS
const express = require("express"); 
const body_parser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet"); 
const sequelize = require("./config/connection"); //import db connection
const PORT = process.env.PORT || 3000;

//IMPORTS MODELS
const Products = require("./models/products");

//APP
const app = express();

app.use(cors());
app.use(helmet());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//ENDPOINTS
app.get("/products/:id", (req, res) => {
    let id = req.params.id
    console.log(req.params)
    res.send("<b>Hellos world!</b>" + id);
});

app.post("/products", (req, res) => {
    let name = req.body.name
    let price = req.body.price
    let description = req.body.description
    
    try {
        const newProduct = Products.create({
            name: name,
            price: price,
            description: description
        })
        res.status(200).send({msg:'Product created successfully', newProduct});  
    } catch (error) {
        res.status(400).send({msg:'Something happened' + error});  
    }
});

/*app.delete('/products/:id', (req, res) => {
    const id = req.params.id;

    products.deleteOne({ 
        _id: id 
    }).then(() => {
        res.status(200).json({
            msg: "DELETED"            
        });
    }).catch(function(error){ 
        console.log(error); // Failure 
    });
});

app.put('/products/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    //Buscamos el id
    let product = await product.findOne( {
        _id: id   
    });
    //Cambiamos el name
    product.name = name;
    //Guardamos
    product.save();

    res.status(200).send({
        msg: `The NEW dish ${name} was added to the menu`
    });
});*/



//SERVER
app.listen(PORT, () => {
    console.log(`Server started to listen in port ${PORT}`);
});
   
