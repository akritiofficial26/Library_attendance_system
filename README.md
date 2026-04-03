# Library Attendance System

A full-stack web application to manage student library attendance.

This project has:
- A Node.js + Express + Prisma backend (PostgreSQL)
- A React + Vite frontend
- JWT-based admin authentication
- Student check-in/check-out attendance APIs

## Table of Contents
- [What This Project Does](#what-this-project-does)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Environment Variables](#environment-variables)
- [Setup and Run](#setup-and-run)
- [Database Setup (Prisma)](#database-setup-prisma)
- [API Summary](#api-summary)
- [How the Frontend Works](#how-the-frontend-works)
- [Important Notes](#important-notes)
- [Known Limitations](#known-limitations)

## What This Project Does

The Library Attendance System helps an admin:
- Register and log in
- Check in a student using student college ID
- Check out a student and calculate time spent
- View today attendance status for a student
- View all attendance records

## Project Structure

```
Library_attendance_system/
├── backend/
│   ├── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── src/
│       ├── config/
│       │   └── prisma.config.js
│       ├── controllers/
│       │   ├── authController.js
│       │   └── attendanceController.js
│       ├── middleware/
│       │   └── authMiddleware.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   └── attendanceRoutes.js
│       └── utils/
│           └── jwt.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── Pages/
│   │   │   ├── login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Performance.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Attendance.jsx
│   │   │   ├── StudentRecord.jsx
│   │   │   ├── Cards.jsx
│   │   │   ├── SideBar.jsx
│   │   │   └── HorizontalNavbar.jsx
│   │   └── Toaster/
│   │       └── Toaster.jsx
│   └── vite.config.js
├── ATTENDANCE_API_DOCUMENTATION.md
└── README.md
```

## Tech Stack

Backend:
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Cookie Parser + CORS

Frontend:
- React
- Vite
- Axios
- React Router
- Tailwind CSS
- Font Awesome

## Requirements

Install these first:
- Node.js 18 or higher
- npm
- PostgreSQL

## Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/library_attendance
DIRECT_URL=postgresql://USER:PASSWORD@localhost:5432/library_attendance
JWT_SECRET=your_super_secret_key
```

Notes:
- Frontend API calls are currently set to `http://localhost:5000`, so keep backend on port 5000.
- `CORS_ORIGIN` should match frontend URL.

## Setup and Run

Open two terminals.

### 1) Setup and run backend

```bash
cd backend
npm install
npm run start
```

Backend starts at:
- `http://localhost:5000`

### 2) Setup and run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at:
- `http://localhost:5173`

## Database Setup (Prisma)

Run these commands in `backend/`:

```bash
npx prisma generate
npx prisma migrate dev
node prisma/seed.js
```

Useful optional command:

```bash
npx prisma studio
```

## API Summary

Base URL:
- `http://localhost:5000/api`

Authentication:
- Attendance routes need admin auth middleware.
- Token is read from cookie (`token`) in backend middleware.

Auth endpoints:
- `POST /api/auth/admin-register`
- `POST /api/auth/admin-login`
- `GET /api/auth/admins`

Attendance endpoints:
- `GET /api/attendance/all`
- `POST /api/attendance/check-in`
- `POST /api/attendance/check-out`
- `GET /api/attendance/status/:collegeId`

For full request/response examples, read:
- `ATTENDANCE_API_DOCUMENTATION.md`

## How the Frontend Works

Main pages:
- Login page: `frontend/src/Pages/login.jsx`
- Register page: `frontend/src/Pages/Register.jsx`
- Dashboard page: `frontend/src/Dashboard/Dashboard.jsx`
- Performance page: `frontend/src/Pages/Performance.jsx`

Current status of UI integration:
- Login and Register call backend APIs.
- Dashboard cards, attendance scan section, and student table are mostly static UI right now.
- You can connect these components to attendance APIs for live data.

## Important Notes

- Attendance is tracked per student, per day.
- A student can have multiple sessions in one day.
- Check-out calculates duration from last check-in.
- API stores session times in ISO format.
- Convert time to local format in frontend when displaying.

## Known Limitations

- Auth middleware currently checks token from cookies only.
  - If you send token only in Authorization header, middleware should be updated.
- Some frontend data is hardcoded for demo UI.
- There is no root npm script to run both frontend and backend together yet.

If you want, next step can be:
1. Add one-command start scripts at root.
2. Connect Dashboard attendance UI to real APIs.
3. Add logout API and protected routes.
