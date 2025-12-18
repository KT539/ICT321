# ICT321

---
---
## **Projet_I321, API Foodtruck**
Une API REST construite avec Node.js, Express et SQLite pour gérer la carte d'un Foodtruck-pizzeria.

---
---
## **Groupe**
Niels Delafontaine, Kilian Testard

---
---
## **Installation**
- Cloner le dépôt Github (https://github.com/KT539/ICT321).
- Se positionner dans le dossier projet_I321 (cd projet_I321).
- Lancer la commande: npm install.
- Configurer l'environnement: créer un fichier .env à la racine contenant "DB_FILE=config/db.sqlite"
  (optionnel, le projet créera un dev.squlite vide par défaut)
- Initialiser les données de test avec la commande: node config/TestData.js
- Lancer le serveur avec la commande: npm start.

---
---
## **Contenu de l'API**
- GET /pizzas --> Liste toutes les pizzas.
- GET /pizzas/full --> Liste toutes les pizzas avec leur liste d'ingrédients.
- GET /pizzas/id --> Récupère une pizza spécifique.
- GET /pizzas/id/ingredients --> Récupère une pizzas spécifique avec sa liste d'ingrédients.
- GET /ingredients --> Liste tous les ingrédients.
- GET /ingredients/id --> Récupère un ingrédient spécifique.
- GET /promotions --> Liste toutes les promotions.
- GET /promotions/id --> Récupère une promotion spécifique.

- POST /pizzas --> Ajoute une nouvelle pizza.
- POST /ingredients --> Ajoute un nouvel ingrédient.
- POST /promotions --> Ajoute une nouvelle promotion.

- PUT /pizzas/id --> Modifie une pizza existante.
- PUT /ingredients/id --> Modifie un ingrédient existant.
- PUT /promotions/id --> Modifie une promotion existante.

- DELETE/pizzas/id --> Supprime une pizza.
- DELETE /ingredients/id --> Supprime un ingrédient.
- DELETE /promotions/id --> Supprime une promotion.

---
Dans ce projet, un PATCH aurait probablement été plus adapté qu'un PUT (car on veut pouvoir faire une modification partielle d'un objet potentiellement complexe, pas un remplacemnt complet). Toutefois, le code actuel du projet permet de supporter les deux philosophies: un remplacement total avec PUT si tout l'objet est fourni, ou une modification partielle "PATCH-like" grâce au COALESCE.

---
---
## **Architecture du projet**
Le projet suit une strcuture MVC:
- bin/www:       Point d'entrée, configuration du serveur HTTP.
- app.js:        Configuration d'Express et des middlewares.
- entities/:     Logique d'accès aux données (Models) utilisant des Promises.
- controllers/:  Logique métier et gestion des réponses HTTP.
- routes/:       Définition des endpoints et validation des entrées.
- config/:       Configuration de la base de données SQLite.

---
---
## **Dépendances principales**
- express
- sqlite3
- express-validator
- dotenv

