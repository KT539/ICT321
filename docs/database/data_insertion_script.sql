USE projet_foodtruck;

INSERT INTO pizzas (id, name, imageURL, price, created_at, updated_at) VALUES
(1, 'Margherita', '', 12.00, NOW(), NOW()),
(2, '4 Seasons', '', 17.00, NOW(), NOW()),
(3, 'Foodtruck Special', '', 20.00, NOW(), NOW()),
(4, 'Queen', '', 15.50, NOW(), NOW()),
(5, 'Diavola', '', 16.00, NOW(), NOW()),
(6, 'Vegetarian', '', 14.00, NOW(), NOW());


INSERT INTO ingredients (name) VALUES
('Mozzarella'),
('Tomatoes'),
('Basilic'),
('Ham'),
('Fresh mushrooms'),
('Pepper bells'),
('Artichokes'),
('Yellow tomato sauce'),
('Bresaola'),
('Parmesan'),
('Rucola'),
('Cherry tomatoes'),
('Mozzarella fior di latte'),
('Pepperoni'),
('Black Olives'),
('Garlic'),
('Red onions'),
('Eggplant'),
('Zucchini');


-- Margherita (1)
INSERT INTO pizza_ingredients VALUES
(1, (SELECT id FROM ingredients WHERE name='Mozzarella')),
(1, (SELECT id FROM ingredients WHERE name='Tomatoes')),
(1, (SELECT id FROM ingredients WHERE name='Basilic'));

-- 4 Seasons (2)
INSERT INTO pizza_ingredients VALUES
(2, (SELECT id FROM ingredients WHERE name='Ham')),
(2, (SELECT id FROM ingredients WHERE name='Fresh mushrooms')),
(2, (SELECT id FROM ingredients WHERE name='Pepper bells')),
(2, (SELECT id FROM ingredients WHERE name='Artichokes')),
(2, (SELECT id FROM ingredients WHERE name='Mozzarella'));

-- Foodtruck Special (3)
INSERT INTO pizza_ingredients VALUES
(3, (SELECT id FROM ingredients WHERE name='Yellow tomato sauce')),
(3, (SELECT id FROM ingredients WHERE name='Bresaola')),
(3, (SELECT id FROM ingredients WHERE name='Parmesan')),
(3, (SELECT id FROM ingredients WHERE name='Rucola')),
(3, (SELECT id FROM ingredients WHERE name='Cherry tomatoes')),
(3, (SELECT id FROM ingredients WHERE name='Mozzarella fior di latte'));

-- Queen (4)
INSERT INTO pizza_ingredients VALUES
(4, (SELECT id FROM ingredients WHERE name='Ham')),
(4, (SELECT id FROM ingredients WHERE name='Mozzarella')),
(4, (SELECT id FROM ingredients WHERE name='Fresh mushrooms'));

-- Diavola (5)
INSERT INTO pizza_ingredients VALUES
(5, (SELECT id FROM ingredients WHERE name='Tomatoes')),
(5, (SELECT id FROM ingredients WHERE name='Mozzarella')),
(5, (SELECT id FROM ingredients WHERE name='Pepperoni')),
(5, (SELECT id FROM ingredients WHERE name='Black olives'));

-- Vegetarian (6)
INSERT INTO pizza_ingredients VALUES
(6, (SELECT id FROM ingredients WHERE name='Tomatoes')),
(6, (SELECT id FROM ingredients WHERE name='Mozzarella')),
(6, (SELECT id FROM ingredients WHERE name='Eggplant')),
(6, (SELECT id FROM ingredients WHERE name='Zucchini')),
(6, (SELECT id FROM ingredients WHERE name='Red onions')),
(6, (SELECT id FROM ingredients WHERE name='Pepper bells')),
(6, (SELECT id FROM ingredients WHERE name='Black olives'));



INSERT INTO promotion (pizza_id, percentage, starting_date, end_date) VALUES
(3, 20, '2025-02-01', '2025-02-03'),   
(5, 15, '2025-03-10', '2025-03-12'),  
(1, 10, '2025-04-01', '2025-04-02'),   
(4, 25, '2025-05-20', '2025-05-21'),   
(6, 30, '2025-06-15', '2025-06-16');   