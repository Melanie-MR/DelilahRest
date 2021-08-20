const { DataTypes } = require("sequelize")
const sequelize = require("../config/connection") //import db connection

const Users = sequelize.define("users",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        first_name:{
            type: DataTypes.STRING,
        },
        last_name:{
            type:DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
        },
        phone_number:{
            type: DataTypes.INTEGER,
        },
        address:{
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING,  ///no deberia ser string
        },
        is_admin:{
            type: DataTypes.BOOLEAN, ///NO SEGURA
        },
    }, 
    {
        timestamps: false
    }
)
module.exports = Users
