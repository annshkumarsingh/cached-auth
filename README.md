Cached Auth – Scalable Backend Assignment
Overview

This project was built as part of Primetrade.ai’s Backend Developer Internship Assignment.
The goal of the assignment is to design and implement a secure, scalable REST API with authentication, role-based access control, caching, and a minimal frontend to demonstrate API usage.

The project focuses primarily on backend system design, with the frontend acting as a lightweight interface for testing and visualizing API behavior.

Features
Authentication & Authorization

User registration and login with bcrypt password hashing

JWT-based authentication stored securely in httpOnly cookies

Role-based access control (RBAC):

`USER` – access to general resources  
`ADMIN` – access to admin-only routes (eg. users API)

Backend APIs

RESTful APIs following proper HTTP status codes and versioning

API versioning via /api/v1/*

Protected routes using middleware-based JWT verification

Centralized role enforcement on the server

Database & Caching

PostgreSQL as the primary relational database

Proper schema design with:

Users

Tasks

Products

Foreign key relationships with cascade deletes

Redis caching to reduce database load and demonstrate performance gains

Cache invalidation and TTL-based refresh

Frontend (Supportive)

Built using Next.js (App Router)

Simple UI to:

Register and log in users

Access protected APIs

Perform read operations on entities

Compare cached vs non-cached responses

Client-side response time measurement to visualize caching impact

Tech Stack
Layer	Technology
Frontend	Next.js (React)
Backend	Next.js API Routes
Authentication	JWT, bcrypt
Database	PostgreSQL
Caching	Redis
Language	TypeScript
Styling	Tailwind CSS
Project Structure (High Level)
src/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── auth/
│   │       ├── users/
│   │       ├── tasks/
│   │       └── products/
│   ├── login/
│   ├── about/
│   └── page.tsx
│
├── config/
│   ├── db.ts
│   └── redis.ts
│
├── middleware/
│   └── verifyToken.ts
│
├── components/
│   ├── AuthCard.tsx
│   ├── FetchCard.tsx
│   └── Navbar.tsx

API Access Control
Route	Access
/api/v1/auth/*	Public
/api/v1/tasks	Authenticated users
/api/v1/products	Authenticated users
/api/v1/users	Admin only

### Admin Access

Public registration is restricted to the `USER` role.
The `ADMIN` role is provisioned via database seeding only to prevent
privilege escalation through the API.

A seeded admin account is used locally to test admin-only routes
such as `/api/v1/users`.


Role checks are enforced server-side, not on the frontend.

Security Considerations

Passwords are never stored in plaintext

JWTs are stored in httpOnly cookies

Role checks are enforced on protected routes

Input validation is applied before database operations

No sensitive credentials are hardcoded

Scalability Notes

Redis caching reduces repeated database queries

Stateless JWT authentication allows horizontal scaling

Modular API structure supports easy feature expansion

Environment-based configuration enables production deployment without code changes

Running Locally

Clone the repository

Install dependencies

npm install


Set up environment variables

DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your_jwt_secret_key


Start the development server

npm run dev

## API Documentation

A Postman collection is included in this repository to demonstrate
authentication, authorization, and protected API access.

File:
- `cached-auth.postman_collection.json`

Usage:
1. Import the collection into Postman
2. Run Register or Login
3. Execute protected routes (Tasks, Products, Users)
4. Authentication cookies are handled automatically by Postman

Protected endpoints will return `Unauthorized` if accessed without
prior authentication, which is expected behavior.

Assignment Context

This project was completed as part of Primetrade.ai’s Backend Developer Internship Assignment, with an emphasis on backend correctness, security, and scalability rather than frontend complexity.