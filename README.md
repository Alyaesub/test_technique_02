Voici un début de README propre et simple pour ton repo. Il reste neutre pour pouvoir s’adapter au test demain.

# Technical Test – Full Stack Application

Starter project for a full stack application built with a **React frontend** and a **Node.js / Express backend**, both written in **TypeScript**.

The goal of this repository is to provide a clean and maintainable base architecture for implementing the requested features.

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- SCSS

## Backend

- Node.js
- Express
- TypeScript
- dotenv
- cors

## Tooling

- ESLint
- concurrently (to run frontend and backend together)

---

# Project Structure

project-root
│
├── client/ # Frontend (React + Vite)
│ └── src/
│ ├── components
│ ├── pages
│ ├── services
│ └── styles
│
├── server/ # Backend (Node + Express)
│ └── src/
│ ├── controllers
│ ├── middlewares
│ ├── models
│ ├── routes
│ ├── services
│ ├── app.ts
│ └── server.ts
│
└── package.json # Root scripts

---

# Requirements

Recommended environment:

- Node.js **18+**
- npm **9+**

---

# Installation

Clone the repository and install dependencies.

```bash
git clone <repo-url>
cd project

Install frontend dependencies:

cd client
npm install

Install backend dependencies:

cd ../server
npm install


⸻

Running the project

From the project root:

npm run dev

This will start:
	•	the frontend (Vite) on http://localhost:5173
	•	the backend (Express API) on http://localhost:3001

⸻

API Health Check

Example endpoint available for testing the API:

GET /health

Response example:

{
  "success": true,
  "message": "API is running"
}


⸻
```
