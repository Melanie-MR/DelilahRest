const { DataTypes } = require("sequelize")
const sequelize = require("../config/connection") //import db connection
const Orders = require("./orders")
const Products = require("./products")

const OrderProducts = sequelize.define("order_products",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Products,
                key:'id'
            }
        },
        order_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Orders,
                key:'id'
            }
        },
        name:{
            type: DataTypes.STRING,
        },
        price:{
            type:DataTypes.DECIMAL,
        }
    }, 
    {
        timestamps: false
    }
)
module.exports = OrderProducts
