const Sequelize = require("sequelize");
const dialect = "mysql"; 
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const port =  process.env.DB_PORT;
const password = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const connectionString = `${dialect}://${user}@${host}:${port}/${dbName}`;
const sequelize = new Sequelize(connectionString);


//Method to connect with DB

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });


  module.exports = sequelize