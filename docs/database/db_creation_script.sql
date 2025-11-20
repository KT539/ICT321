DROP DATABASE IF EXISTS projet_foodtruck;
CREATE DATABASE projet_foodtruck;
USE projet_foodtruck;

DROP TABLE IF EXISTS pizzas;
CREATE TABLE pizzas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    imageURL VARCHAR(500),
    price DECIMAL(6,2) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS ingredients;
CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS pizza_ingredients;
CREATE TABLE pizza_ingredients (
    pizza_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (pizza_id, ingredient_id),
    FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS promotion;
CREATE TABLE promotion (
    id INT AUTO_INCREMENT PRIMARY KEY,
	 pizza_id INT NOT NULL,
    percentage INT NOT NULL,
    starting_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE
);