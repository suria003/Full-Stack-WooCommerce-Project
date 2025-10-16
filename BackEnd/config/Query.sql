-- USERS TABLE

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(120) NOT NULL,
  `tkn` VARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `tkn` (`tkn`)
);

-- PRODUCT'S TABLE

CREATE TABLE `products` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_status` varchar(50) DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `tags` text,
  `on_sale` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `tkn` varchar(10) NOT NULL,
  PRIMARY KEY (`sno`),
  UNIQUE KEY `sno` (`sno`)
);