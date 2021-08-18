const Sequelize = require("sequelize");

//DB connection
const dialect = "mysql"; //process.env.dialect    clase 39  
const user = "root";
const host = "localhost";
const port = 3306;
const dbName = "delilah";
const connectionString = `${dialect}://${user}@${host}:${port}/${dbName}`;
const sequelize = new Sequelize(connectionString);

//metodo para conectarnos a la base de datos

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });


  module.exports = sequelize