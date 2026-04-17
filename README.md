<div align="center">

<h1>
  <img src="https://img.shields.io/badge/📚-Studify-6366f1?style=for-the-badge&labelColor=1e1e2e" alt="Studify" />
</h1>

<h3><em>Your personal command center for academic success.</em></h3>

<p>
  <img src="https://img.shields.io/badge/Status-In_Development-f59e0b?style=flat-square" />
  <img src="https://img.shields.io/badge/Version-1.0.0-6366f1?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" />
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
</p>

</div>

---

## 📌 Overview

Students today are overwhelmed — juggling multiple courses, assignments, deadlines, and personal goals without a centralized system to keep it all together.

**Studify** is a fullstack web application built to solve exactly that. It provides students with a clean, distraction-free workspace to manage their academic tasks, track progress, and stay ahead of deadlines — all in one place.

> Built as a portfolio project to demonstrate production-level fullstack development skills, clean architecture, and real-world engineering thinking.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Secure Authentication** | JWT-based auth with access/refresh token strategy and password hashing via bcrypt |
| ✅ **Task Management** | Full CRUD for tasks with status tracking (`TODO`, `IN_PROGRESS`, `DONE`) and priority levels |
| 📅 **Deadline Tracking** | Set due dates per task and get a clear view of what's urgent |
| 📊 **Progress Dashboard** | Visual overview of task completion rates and productivity trends |
| 🔎 **Smart Filtering** | Filter tasks by status, priority, or due date for focused workflows |
| 🛡️ **Protected Routes** | Client-side and server-side route guards to ensure data privacy |
| 📱 **Responsive Design** | Fully optimized for desktop, tablet, and mobile devices |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
│                   Next.js + Tailwind CSS                     │
│          Pages / Components / Hooks / API Layer              │
└────────────────────────┬────────────────────────────────────┘
                         │  HTTP / REST (JSON)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js)                        │
│                  Express.js REST API                         │
│        Routes → Controllers → Services → Prisma ORM         │
│              Middleware: Auth (JWT) · Helmet · CORS          │
└────────────────────────┬────────────────────────────────────┘
                         │  SQL Queries via Prisma
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL)                      │
│                  Users · Tasks · Enums                       │
└─────────────────────────────────────────────────────────────┘
```

**Design Principles:**
- **Separation of Concerns** — Routes, controllers, services, and data access are decoupled
- **Stateless API** — Each request is self-contained via JWT, enabling horizontal scalability
- **Schema-first DB** — Prisma schema as single source of truth for database structure

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router & SSR/CSR flexibility |
| **Tailwind CSS** | Utility-first CSS for rapid, consistent UI development |
| **React Query** | Server state management, caching, and background refetching |
| **Axios** | HTTP client with interceptors for token handling |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for the server |
| **Express.js v5** | Lightweight, fast REST API framework |
| **Prisma ORM v7** | Type-safe database access and migrations |
| **PostgreSQL** | Robust relational database |
| **JWT** | Stateless authentication tokens |
| **bcryptjs** | Secure password hashing |
| **Helmet** | HTTP security headers |
| **Morgan** | HTTP request logging |

---

## 📁 Project Structure

```
studify/
├── frontend/                   # Next.js application
│   ├── app/                    # App Router pages & layouts
│   ├── components/             # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Axios instance, utilities
│   └── types/                  # TypeScript interfaces
│
└── backend/                    # Node.js + Express API
    ├── prisma/
    │   └── schema.prisma       # Database schema (source of truth)
    ├── src/
    │   ├── controllers/        # Request/response handlers
    │   ├── services/           # Business logic layer
    │   ├── routes/             # API route definitions
    │   ├── middleware/         # Auth, error handling, validation
    │   ├── utils/              # Helpers and shared utilities
    │   └── server.js           # App entry point
    ├── prisma.config.ts
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) `v18+`
- [PostgreSQL](https://www.postgresql.org/) `v14+`
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/RotuaTampubolon/studify.git
cd studify
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

**Configure environment variables:**

```bash
cp .env.example .env
# Then edit .env with your values (see Environment Variables section below)
```

**Run database migrations:**

```bash
npx prisma migrate dev --name init
```

**Generate Prisma client:**

```bash
npx prisma generate
```

**Start the development server:**

```bash
npm run dev
# Server runs at http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

**Configure environment variables:**

```bash
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Start the development server:**

```bash
npm run dev
# App runs at http://localhost:3000
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
# Server
PORT=5000

# Database
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/studify_db

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Client
CLIENT_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/auth/me` | Get current user profile | ✅ |

### Tasks

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/tasks` | Get all tasks for current user | ✅ |
| `GET` | `/tasks/:id` | Get a single task by ID | ✅ |
| `POST` | `/tasks` | Create a new task | ✅ |
| `PATCH` | `/tasks/:id` | Update task (partial) | ✅ |
| `DELETE` | `/tasks/:id` | Delete a task | ✅ |

### Query Parameters (GET `/tasks`)

| Param | Type | Options |
|---|---|---|
| `status` | `string` | `TODO` · `IN_PROGRESS` · `DONE` |
| `priority` | `string` | `LOW` · `MEDIUM` · `HIGH` |
| `sortBy` | `string` | `dueDate` · `createdAt` · `priority` |

**Example Request:**
```http
GET /api/tasks?status=TODO&priority=HIGH
Authorization: Bearer <your_jwt_token>
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "title": "Complete Final Project",
      "description": "Write the technical documentation",
      "status": "TODO",
      "priority": "HIGH",
      "dueDate": "2026-05-01T00:00:00.000Z",
      "createdAt": "2026-04-17T00:00:00.000Z"
    }
  ]
}
```

---

## 🗃️ Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]
}

model Task {
  id          String     @id @default(uuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  userId      String
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum TaskStatus { TODO  IN_PROGRESS  DONE }
enum Priority   { LOW   MEDIUM       HIGH }
```

---

## 📸 Screenshots

> 🚧 Screenshots will be added upon UI completion.

| Dashboard | Task Board | Login Page |
|---|---|---|
| `[screenshot]` | `[screenshot]` | `[screenshot]` |

---

## 🗺️ Roadmap

- [x] JWT authentication (register & login)
- [x] Task CRUD with status & priority
- [x] Database schema with Prisma
- [ ] Frontend UI (Next.js + Tailwind)
- [ ] Dashboard with progress analytics
- [ ] Due date reminders / notifications
- [ ] Task categories and tagging
- [ ] Study timer (Pomodoro integration)
- [ ] Note-taking module per task
- [ ] Calendar view for deadlines
- [ ] Dark / light mode toggle
- [ ] Mobile-first PWA support

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Studify:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 👨‍💻 Author

<div align="center">

**[Rotua Immanuela Tampubolon]**
*4th Semester — Information Systems*

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RotuaTampubolon)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/RotuaImmanuela)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rotuaimmanuela@gmail.com)

*Open to software engineering internship opportunities.*

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ☕ and a lot of determination by a student who refuses to build boring portfolio projects.</sub>
</div>
