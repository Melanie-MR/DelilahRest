# Delilah Rest API
This is a Rest API for online orders of a restaurant. You can do CRUD operations to manage the menu, orders and user's information. Also, this app supports Token Based Authentication with JWT. 

## Technologies:
* JavaScript
* NodeJS
* Express
* Sequelize
* MySQL
* Bcryptjs
* Jsonwebtoken
* Postman for testing
* Swagger (Documentation)

## How to install?

You can clone the repository from here. Go to the CODE button in the right and click on download zip.
Once that you have the files, open it in your favorite editor.

WARNING:
You must modify config/connection.js to make it match with your enviroment. Take in account that in the file .env you can adjust the variables used in the file config/connection.js. For example: DB_NAME, DB_HOST, DB_PORT...

## Data Base:

Use the delilah.sql file to import it into your Database client, it will provide the entire structure. I recommend using Postman to test the endpoints.


## Dependencies:
In your terminal, install the necessary dependencies running the command:

*npm init --yes*

then,

*npm install express sequelize mysql2 body-parser dotenv cors jsonwebtoken bcryptjs --save*

Finally, execute the following command: 

*npm run dev*

You have all set! 
Have fun!:)


## Documentation:
This is the documentation, Following the OpenAPI Specification provided by Swagger:

delilah-doc.yaml
