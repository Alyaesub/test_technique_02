# Lynoria – Test Technique Full Stack

Mini application **Full Stack** permettant de gérer des **logements** et des **occupants**, réalisée dans le cadre du test technique développeur Full Stack pour **Lynoria**.

L’application permet :

- de créer des logements
- de créer des occupants
- d’affecter un occupant à un logement
- de consulter les occupants associés à chaque logement
- de supprimer un logement

Le projet est composé :

- d’une **API Node.js typée**
- d’un **frontend React**
- d’une **base SQLite via Prisma**

---

# Stack Technique

## Frontend

| Technologie | Rôle                    |
| ----------- | ----------------------- |
| React       | Framework UI            |
| TypeScript  | Typage statique         |
| Vite        | Dev server & build tool |
| SCSS        | Styling                 |

---

## Backend

| Technologie | Rôle                                  |
| ----------- | ------------------------------------- |
| Node.js     | Runtime                               |
| Express     | Framework HTTP                        |
| TypeScript  | Typage statique                       |
| Prisma      | ORM et gestion des migrations         |
| SQLite      | Base de données locale                |
| Zod         | Validation des entrées                |
| dotenv      | Gestion des variables d’environnement |
| cors        | Gestion du CORS                       |

---

## Tooling

| Outil          | Rôle                      |
| -------------- | ------------------------- |
| ESLint         | Linting                   |
| concurrently   | Lancer frontend + backend |
| GitHub Actions | CI/CD                     |

---

# Fonctionnalités de l'application

## Gestion des logements

- créer un logement
- lister les logements
- supprimer un logement
- afficher les occupants d’un logement

## Gestion des occupants

- créer un occupant
- lister les occupants

## Affectation

- affecter un occupant à un logement
- un occupant ne peut être affecté qu’à **un seul logement**

## Statut des logements

Un logement possède un statut :

- `AVAILABLE`
- `OCCUPIED`
- `MAINTENANCE`

Lorsqu’un occupant est affecté à un logement, son statut est automatiquement mis à jour en **`OCCUPIED`**.

---

# Structure du projet

project-root/
│
├── client/ # Frontend React
│ └── src/
│ ├── api/
│ ├── components/
│ │ ├── forms/
│ │ └── housing-units/
│ ├── pages/
│ ├── types/
│ ├── utils/
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

Aucune base de données externe n’est nécessaire.

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
DELETE	/housing-units/:id	Supprimer un logement
POST	/occupants	Créer un occupant
GET	/occupants	Lister les occupants
POST	/assignments	Affecter un occupant à un logement
GET	/housing-units/:id/occupants	Obtenir les occupants d’un logement


⸻

Exemples de requêtes

Health Check

GET /health

Réponse :

{
  "status": "ok"
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

Architecture Backend

L’API suit une architecture en couches :

routes → controllers → services → prisma

Responsabilités :
	•	Routes : définition des endpoints
	•	Controllers : gestion des requêtes HTTP
	•	Services : logique métier
	•	Prisma : accès base de données

Cette séparation améliore :
	•	la lisibilité
	•	la maintenabilité
	•	la testabilité

⸻

Architecture Frontend

Le frontend suit une organisation modulaire :

src
│
├── api/            # appels API
├── components/     # composants UI
│   ├── forms/
│   └── housing-units/
│
├── pages/          # pages principales
├── types/          # types TypeScript
├── utils/          # helpers
└── styles/         # SCSS

Principes :
	•	séparation UI / API
	•	composants réutilisables
	•	typage strict avec TypeScript

⸻

Logique métier

Règles appliquées :
	•	un logement peut contenir plusieurs occupants
	•	un occupant ne peut être affecté qu’à un seul logement
	•	l’email d’un occupant est unique
	•	lorsqu’un occupant est affecté à un logement, le statut du logement passe automatiquement à OCCUPIED

⸻

CI/CD

Un pipeline GitHub Actions vérifie automatiquement :
	•	installation des dépendances
	•	vérification TypeScript
	•	lint
	•	build frontend
	•	build backend

Le pipeline est séparé en deux jobs :
	•	frontend
	•	backend

⸻

Variables d’environnement

Copier .env.example vers .env

PORT=****
DATABASE_URL="file:./dev.db"

Aucun secret n’est stocké dans le dépôt.

⸻

Améliorations possibles

Domaine	Amélioration
Statut logement	Recalcul automatique AVAILABLE si aucun occupant
Affectation	Permettre la réaffectation d’un occupant
Validation	Validation supplémentaire côté frontend
Tests	Tests unitaires et tests d’intégration
Pagination	Pagination des listes
Base de données	Migration vers PostgreSQL
Docker	Ajouter un docker-compose
Authentification	JWT / RBAC


Auteur

Projet réalisé dans le cadre du test technique Full Stack Lynoria.


```
