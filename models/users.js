const { DataTypes } = require("sequelize")
const sequelize = require("../config/connection") //import db connection

const Users = sequelize.define("users",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
        },
        fullname:{
            type: DataTypes.STRING,
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


//To ask for all the users in the database
const getAll = () => {
    return new Promise((resolve,reject) => {
        db.query('SELECT *FROM users', (err,rows) =>{
            if (err) reject(err)
            resolve(rows);
        });
    });
};


module.exports = {getAll: getAll}
module.exports = Users