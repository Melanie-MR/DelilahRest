const Sequelize = require("sequelize");

//DB connection
/*const dialect = "mysql"; 
const user = "root";
const host = "localhost";
const port = 3306;
const dbName = "delilah";
const connectionString = `${dialect}://${user}@${host}:${port}/${dbName}`;
const sequelize = new Sequelize(connectionString);
*/

///esto funciona, descomentar si no funciona lo otro.
const dialect = "mysql"; 
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const port =  process.env.DB_PORT;
const password = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
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