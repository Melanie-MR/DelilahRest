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

*PLEASE READ UNTIL THE BOTTOM TO INSTALL IT PROPERLY*

You can clone the repository from here. Go to the CODE button in the right and click on download zip.
Once that you have the files, open it in your favorite editor.

## Dependencies:
In your terminal, install the necessary dependencies running the command:

*npm init --yes*

then,

*npm install express sequelize mysql2 body-parser dotenv cors jsonwebtoken bcryptjs --save*

**WARNING:
You must modify config/connection.js to make it match with your enviroment. Take in account that in the file .env you can adjust the variables used in the file config/connection.js. For example: DB_NAME, DB_HOST, DB_PORT...**

## Data Base:

Use the config/delilah.sql file to import it into your Database client. It will provide the entire structure and some examples to add products and users. I recommend using Postman to test the endpoints. This is an *example* of how you can test it in [Postman](https://documenter.getpostman.com/view/13883517/UUy4cQzd).

IF YOU HAVE BOTH DB CREATED AND THE CONFIG ADJUSTMENTS DONE IN YOUR EDITOR, GO AHEAD WITH THE NEXT STEP:

Execute the following command: 

*npm run dev*

You have all set! Try the endpoints in your Postman collection and have fun! :)

## Documentation:
The documentation is in *delilah-doc.yaml* file. I followed the OpenAPI Specification provided by [Swagger](https://swagger.io/specification/)


