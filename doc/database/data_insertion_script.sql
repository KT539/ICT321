USE projet_foodtruck;

INSERT INTO pizzas (id, name, imageURL, price, pizza_of_the_day, created_at, updated_at) VALUES
(3, '4 Saisons', '', 17, 0, '2025-09-09 08:26:21', '2025-09-09 08:26:21'),
(2, 'Margherita', '', 12, 0, '2025-09-09 08:26:21', '2025-09-09 08:26:21'),
(1, 'Diavola', '', 20, 1, '2025-09-09 08:26:21', '2025-09-09 08:26:21');


INSERT INTO ingredients (name) VALUES
('Ham'),
('Fresh mushrooms'),
('Pepper bells'),
('Artichokes'),
('Mozzarella'),
('Merguez'),
('pepperoni'),
('Red onions'),
('Mozzarella fior di latte');



-- Pizza 4 Saisons (id 3)
INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES
(3, (SELECT id FROM ingredients WHERE name='Ham')),
(3, (SELECT id FROM ingredients WHERE name='Fresh mushrooms')),
(3, (SELECT id FROM ingredients WHERE name='Pepper bells')),
(3, (SELECT id FROM ingredients WHERE name='Artichokes')),
(3, (SELECT id FROM ingredients WHERE name='Mozzarella'));

-- Pizza Margherita (id 2)
INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES
(2, (SELECT id FROM ingredients WHERE name='Mozzarella'));

-- Pizza Diavola (id 1)
INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES
(1, (SELECT id FROM ingredients WHERE name='Merguez')),
(1, (SELECT id FROM ingredients WHERE name='Pepperoni')),
(1, (SELECT id FROM ingredients WHERE name='Pepper bells')),
(1, (SELECT id FROM ingredients WHERE name='Red onions')),
(1, (SELECT id FROM ingredients WHERE name='Mozzarella fior di latte'));