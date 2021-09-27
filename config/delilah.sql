/*Products*/
CREATE TABLE IF NOT EXISTS `products` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    description VARCHAR(200)
) DEFAULT CHARSET = UTF8

/*Users*/
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
	fullname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number INT NOT NULL,
    address VARCHAR(500) NOT NULL,
    password VARCHAR(50) NOT NULL,
    is_admin BOOLEAN
) DEFAULT CHARSET = UTF8

/*Orders*/

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_status ENUM('new', 'confirmed', 'processing', 'sending', 'cancelled', 'delivered') DEFAULT 'new',
    user_id INT NOT NULL,
    payment_method ENUM('cash', 'credit_card', 'debit_card') DEFAULT 'cash',
    order_date DATE NOT NULL DEFAULT NOW(),
    description VARCHAR(200) NOT NULL,
    address VARCHAR(500) NOT NULL,
    total DECIMAL(9,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `users`(`id`)
) DEFAULT CHARSET = UTF8

/*Order Products*/

DROP TABLE IF EXISTS `order_products`;
CREATE TABLE IF NOT EXISTS `order_products` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES `products`(`id`),
    FOREIGN KEY (order_id) REFERENCES `orders`(`id`)
) DEFAULT CHARSET = UTF8

INSERT INTO products (name, price, description) VALUES ('Arepa with pulled meat', '15', 'A venezuelan corn bread');
INSERT INTO products (name, price, description) VALUES ('Hallaca', '20', 'A venezuelan tamale');
INSERT INTO products (name, price, description) VALUES ('Papelon with lemon', '5', 'Refreshing drink with cane sugar and lemon');
INSERT INTO products (name, price, description) VALUES ('Tequenos', '12', 'The best mozzarella fingers');
INSERT INTO products (name, price, description) VALUES ('Cachapa', '20', 'Corn base pancake with cheese');

INSERT INTO users (username, fullname, email, phone_number, address, password, is_admin) VALUES ('simon','Simon Diaz', 'simon-diaz@gmail.com', 'Calle Tapipa', '12345678',  'simoncito', FALSE);
INSERT INTO users (username, fullname, email, phone_number, address, password, is_admin) VALUES ('soledad','Soledad Bravo', 'sole-bravo@gmail.com', 'Calle Charallave', '87654321',  'sole', TRUE);
