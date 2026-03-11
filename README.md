# Lynoria – Technical Test | Full Stack Application

A full stack mini application for managing **housing units** and **occupants**, built as part of the Lynoria Full Stack developer technical test.

The application allows creating housing units, registering occupants, assigning occupants to housing units, and visualizing the associations — all through a clean React frontend backed by a typed Node.js/Express API.

---

## CI/CD Status

![CI](https://github.com/<your-username>/<your-repo>/actions/workflows/ci.yml/badge.svg)

---

## Tech Stack

### Frontend

| Tech       | Role                 |
| ---------- | -------------------- |
| React      | UI framework         |
| TypeScript | Static typing        |
| Vite       | Dev server & bundler |
| SCSS       | Styling              |

### Backend

| Tech       | Role                               |
| ---------- | ---------------------------------- |
| Node.js    | Runtime                            |
| Express    | HTTP framework                     |
| TypeScript | Static typing                      |
| Prisma     | ORM + migrations                   |
| SQLite     | Database (file-based, zero config) |
| Zod        | Input validation                   |
| dotenv     | Environment variables              |
| cors       | Cross-origin requests              |

### Tooling

| Tool           | Role                            |
| -------------- | ------------------------------- |
| ESLint         | Linting                         |
| concurrently   | Run frontend + backend together |
| GitHub Actions | CI/CD pipeline                  |

---

## Project Structure

```
project-root/
│
├── client/                  # Frontend (React + Vite + TypeScript)
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page-level components
│       ├── services/        # API call logic (fetch wrappers)
│       └── styles/          # SCSS files
│
├── server/                  # Backend (Node + Express + TypeScript)
│   └── src/
│       ├── controllers/     # Request handlers (thin layer)
│       ├── middlewares/     # Error handler, request logger, etc.
│       ├── routes/          # Express route definitions
│       ├── services/        # Business logic
│       ├── db/              # Prisma client instance
│       ├── validators/      # Zod schemas for input validation
│       ├── app.ts           # Express app setup
│       └── server.ts        # Entry point (port binding)
│
├── prisma/                  # Prisma schema + migrations
│   ├── schema.prisma
│   └── migrations/
│
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI pipeline
│
├── .env.example             # Environment variable template
├── package.json             # Root scripts (dev, build, lint...)
└── README.md
```

---

## Requirements

- Node.js **18+**
- npm **9+**

No external database setup required — SQLite is file-based and included.

---

## Installation

```bash
git clone <repo-url>
cd <project-folder>
```

Install all dependencies (frontend + backend):

```bash
npm install
cd client && npm install
cd ../server && npm install
```

Set up environment variables:

```bash
cp .env.example .env
```

Run Prisma migrations to initialize the database:

```bash
cd server
npx prisma migrate dev --name init
```

---

## Running the Project

From the project root:

```bash
npm run dev
```

This starts:

- **Frontend** (Vite) → [http://localhost:5173](http://localhost:5173)
- **Backend** (Express API) → [http://localhost:3001](http://localhost:3001)

---

## API Reference

| Method | Endpoint                       | Description                               |
| ------ | ------------------------------ | ----------------------------------------- |
| `GET`  | `/health`                      | API health check                          |
| `POST` | `/housing-units`               | Create a housing unit                     |
| `GET`  | `/housing-units`               | List all housing units                    |
| `POST` | `/occupants`                   | Create an occupant                        |
| `POST` | `/assignments`                 | Assign an occupant to a housing unit      |
| `GET`  | `/housing-units/:id/occupants` | Get occupants for a specific housing unit |

### Example: Health Check

```http
GET /health
```

```json
{
	"success": true,
	"message": "API is running"
}
```

### Example: Create a housing unit

```http
POST /housing-units
Content-Type: application/json

{
  "name": "Appartement 2B",
  "status": "available"
}
```

---

## Technical Decisions

### SQLite over PostgreSQL

SQLite was chosen for its zero-configuration setup, making the project immediately runnable without any external service. The architecture (Prisma ORM) allows switching to PostgreSQL with a single config change if needed in production.

### Prisma as ORM

Prisma provides type-safe database access, built-in migration management, and a clear schema definition — which aligns well with the TypeScript-first approach of this project.

### Zod for validation

Input validation is handled server-side using Zod. This ensures the backend never blindly trusts frontend data, and keeps validation logic colocated with route definitions.

### Monorepo structure

Client and server are kept in the same repository but remain fully independent (separate `package.json`, separate `tsconfig.json`). A root `package.json` provides convenience scripts to run both together.

### Separation of concerns (backend)

The backend follows a `routes → controllers → services → db` layered architecture. Controllers handle HTTP logic, services contain business logic, and data access is isolated — making each layer independently testable and replaceable.

---

## Hypotheses

- A housing unit can have **multiple occupants** (e.g. shared housing). The model supports this via a join table rather than a simple foreign key on occupant.
- An occupant can only be assigned to **one housing unit at a time**. If a re-assignment is needed, the previous one must be removed first (or updated — TBD based on product requirements).
- The `status` of a housing unit (`available` / `occupied` / `maintenance`) is managed **manually** via the API. Automatic status update on assignment was considered but kept out of scope to avoid hidden side effects.
- Email uniqueness on occupants is enforced at the database level via Prisma, not only at the API level.

---

## Limits & Potential Improvements

| Area                      | Current State                               | Possible Improvement                                   |
| ------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| Authentication            | None                                        | JWT-based auth with role management                    |
| Tests                     | <!-- TODO: fill in after implementation --> | Unit tests (services) + integration tests (API routes) |
| Pagination                | Not implemented                             | Cursor or offset-based pagination on list endpoints    |
| Occupant re-assignment    | Not handled                                 | Dedicated endpoint or update logic                     |
| Auto status update        | Manual only                                 | Auto-update housing unit status on assignment          |
| Frontend state management | Local state / fetch                         | React Query or SWR for caching & revalidation          |
| Database                  | SQLite (file)                               | PostgreSQL for production use                          |
| Docker                    | Not included                                | `docker-compose.yml` for full local stack              |
| Error messages            | Generic                                     | Structured error codes for frontend consumption        |

---

## CI/CD Pipeline

The GitHub Actions pipeline runs on every push and pull request to `main`.

**Steps:**

1. Install dependencies
2. TypeScript type check (`tsc --noEmit`)
3. Lint (`eslint`)
4. Build (`npm run build`)
5. Tests if present (`npm test`)

Pipeline is split into two jobs: `backend` and `frontend`, running in parallel.

See `.github/workflows/ci.yml` for the full configuration.

---

## Environment Variables

Copy `.env.example` to `.env` before running the project.

```env
# Server
PORT=3001
DATABASE_URL="file:./dev.db"
```

> No secrets are committed to this repository. All sensitive configuration is handled via environment variables.
