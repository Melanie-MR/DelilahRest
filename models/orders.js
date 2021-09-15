const { DataTypes } = require("sequelize")
const sequelize = require("../config/connection") //import db connection
const Users = require("./users")

const Orders = sequelize.define("orders",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key:'id'
            }
        },
        order_status:{
            type: DataTypes.ENUM,
            values: ['new', 'confirmed', 'processing', 'sending', 'cancelled', 'delivered']
        },
        payment_method:{
            type: DataTypes.ENUM,
            values: ['cash', 'credit_card', 'debit_card']
        },
        order_date:{
            type: DataTypes.DATE,
        },
        description:{
            type: DataTypes.STRING,
        },
        address:{
            type: DataTypes.STRING,
        },
        total:{
            type:DataTypes.DECIMAL,
        },
        
    }, 
    {
        timestamps: false
    }
)
module.exports = Orders
