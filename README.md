# Lynoria – Test Technique Full Stack

Mini application full stack permettant de gérer des **logements** et des **occupants**, réalisée dans le cadre du test technique développeur Full Stack pour Lynoria.

L'application permet :

- de créer des logements
- de créer des occupants
- d'affecter un occupant à un logement
- de consulter les occupants associés à chaque logement

Le projet est composé d'une API Node.js typée et d'un frontend React.

---

# Stack Technique

## Frontend

| Technologie | Rôle                     |
| ----------- | ------------------------ |
| React       | Framework UI             |
| TypeScript  | Typage statique          |
| Vite        | Dev server et build tool |
| SCSS        | Styling                  |

---

## Backend

| Technologie | Rôle                          |
| ----------- | ----------------------------- |
| Node.js     | Runtime                       |
| Express     | Framework HTTP                |
| TypeScript  | Typage statique               |
| Prisma      | ORM et gestion des migrations |
| SQLite      | Base de données locale        |
| Zod         | Validation des entrées        |
| dotenv      | Variables d'environnement     |
| cors        | Gestion du CORS               |

---

## Tooling

| Outil          | Rôle                      |
| -------------- | ------------------------- |
| ESLint         | Linting                   |
| concurrently   | Lancer frontend + backend |
| GitHub Actions | CI/CD                     |

---

# Structure du projet

project-root/
│
├── client/ # Frontend React
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── styles/
│
├── server/ # Backend Node / Express
│ └── src/
│ ├── controllers/
│ ├── middlewares/
│ ├── routes/
│ ├── services/
│ ├── schemas/
│ ├── utils/
│ ├── lib/
│ │ └── prisma.ts
│ ├── app.ts
│ └── server.ts
│
├── server/prisma/ # Prisma schema + migrations
│
├── .github/workflows/ # CI/CD GitHub Actions
│
├── .env.example
├── package.json
└── README.md

---

# Prérequis

- Node.js **18+**
- npm **9+**

Aucune base de données externe n'est nécessaire.

SQLite est utilisé pour simplifier le setup.

---

# Installation

Cloner le projet :

```bash
git clone <repo-url>
cd <project-folder>

Installer les dépendances :

npm install
cd client && npm install
cd ../server && npm install

Créer le fichier d’environnement :

cp .env.example .env

Initialiser la base de données :

cd server
npx prisma migrate dev --name init


⸻

Lancer le projet

Depuis la racine :

npm run dev

Cela lance :

Frontend
http://localhost:5173

Backend
http://localhost:3001

⸻

API

Méthode	Endpoint	Description
GET	/health	Vérifie que l’API fonctionne
POST	/housing-units	Créer un logement
GET	/housing-units	Lister les logements
POST	/occupants	Créer un occupant
POST	/assignments	Affecter un occupant à un logement
GET	/housing-units/:id/occupants	Obtenir les occupants d’un logement


⸻

Exemple de requêtes

Health Check

GET /health

Réponse :

{
  "message": "API is running"
}


⸻

Créer un logement

POST /housing-units

{
  "name": "Appartement A12",
  "status": "AVAILABLE"
}


⸻

Affecter un occupant

POST /assignments

{
  "housingUnitId": 1,
  "occupantId": 1
}


⸻

Choix Techniques

SQLite

SQLite permet un démarrage immédiat sans configuration externe.
L’utilisation de Prisma permet de migrer facilement vers PostgreSQL si nécessaire.

⸻

Prisma

Prisma offre :
	•	un ORM typé
	•	des migrations
	•	un schéma clair de la base de données
	•	une excellente intégration avec TypeScript

⸻

Zod

La validation des données entrantes est réalisée côté backend avec Zod afin de :
	•	ne jamais faire confiance aux données du frontend
	•	centraliser la validation
	•	améliorer la robustesse de l’API

⸻

Architecture Backend

L’API suit une architecture en couches :

routes → controllers → services → prisma

	•	Routes : définition des endpoints
	•	Controllers : gestion des requêtes HTTP
	•	Services : logique métier
	•	Prisma : accès base de données

Cette séparation permet un code plus lisible et maintenable.

⸻

Hypothèses
	•	Un logement peut contenir plusieurs occupants
	•	Un occupant ne peut être affecté qu’à un seul logement à la fois
	•	Le statut d’un logement (AVAILABLE, OCCUPIED, MAINTENANCE) est géré manuellement via l’API
	•	L’email d’un occupant est unique

⸻

Limites et améliorations possibles

Domaine	Amélioration possible
Authentification	Ajouter un système JWT
Tests	Ajouter tests unitaires et tests d’API
Pagination	Pagination des listes
Réaffectation occupant	Endpoint pour changer de logement
Statut automatique	Mettre à jour automatiquement le statut du logement
Base de données	Passer à PostgreSQL en production
Docker	Ajouter un docker-compose


⸻

CI/CD

Le pipeline GitHub Actions exécute :
	•	installation des dépendances
	•	vérification TypeScript
	•	lint
	•	build

Le pipeline est séparé en deux jobs :
	•	frontend
	•	backend

⸻

Variables d’environnement

Copier .env.example vers .env

PORT=3001
DATABASE_URL="file:./dev.db"

Aucun secret n’est stocké dans le dépôt.

---

# Pourquoi cette version est meilleure

Pour un recruteur :

✔ clair
✔ en français
✔ architecture expliquée
✔ choix techniques expliqués
✔ hypothèses métier
✔ améliorations possibles

C'est **exactement ce qu'ils attendent dans un test technique**.

---

```
