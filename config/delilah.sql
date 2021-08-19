CREATE TABLE IF NOT EXISTS `products` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    description VARCHAR(200)
) DEFAULT CHARSET = UTF8
