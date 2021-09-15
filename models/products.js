const { DataTypes } = require("sequelize")
const sequelize = require("../config/connection") //import db connection

const Products = sequelize.define("products",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
        },
        price:{
            type:DataTypes.DECIMAL,
        },
        description:{
            type: DataTypes.STRING,
        },
    }, 
    {
        timestamps: false
    }
)
module.exports = Products
