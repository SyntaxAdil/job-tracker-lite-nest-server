<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="90" alt="NestJS Logo" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.docker.com/" target="blank"><img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" width="110" alt="Docker Logo" /></a>
</p>

<h1 align="center">Job Tracker Lite</h1>

<p align="center">
  A clean REST API to organize your job hunt: workspaces, applications, and secure authentication.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge&logoColor=white" alt="Better Auth" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
</p>

---

## Features

- **Authentication** with [Better Auth](https://better-auth.com): email and password, secure HttpOnly cookie sessions
- **Workspaces** to group your job search (create, update, archive, delete)
- **Applications** tracked inside each workspace (company, position, status, priority, notes)
- **Ownership checks**: users can only see and change their own data
- **Role-based access** with an admin role for protected routes
- **Validation** on every request with `class-validator`
- **Consistent responses** through a global response interceptor

## Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Framework  | NestJS                                  |
| Language   | TypeScript                              |
| Database   | MongoDB (Mongoose)                      |
| Auth       | Better Auth + `@thallesp/nestjs-better-auth` |
| Runtime    | Bun / Node.js                           |
| Container  | Docker                                  |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js 20+)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
git clone https://github.com/SyntaxAdil/job-tracker-lite-nest-server.git
cd job-tracker-lite-nest-server
bun install
```

### Environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

| Variable             | Description                                  |
| -------------------- | -------------------------------------------- |
| `PORT`               | Port the API runs on                         |
| `MONGO_URI`          | MongoDB connection string (include DB name)  |
| `BETTER_AUTH_SECRET` | Long random secret used by Better Auth       |
| `BETTER_AUTH_URL`    | Public URL of this API                       |
| `CLIENT_URL`         | Frontend URL (used for CORS and trusted origins) |

### Run the app

```bash
# development (watch mode)
bun run start:dev

# production
bun run build
bun run start:prod
```

The API is available at `http://localhost:5000/api`.

## Docker

Build and run the container:

```bash
# build the image
docker build -t job-tracker-lite .

# run the container
docker run -d \
  --name job-tracker-lite \
  -p 5000:5000 \
  --env-file .env \
  job-tracker-lite
```

Useful commands:

```bash
docker logs -f job-tracker-lite   # follow logs
docker stop job-tracker-lite      # stop the container
docker rm job-tracker-lite        # remove the container
```

## API Overview

All routes are prefixed with `/api` and require login unless noted.

### Auth (handled by Better Auth)

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| POST   | `/api/auth/sign-up/email` | Register           |
| POST   | `/api/auth/sign-in/email` | Login              |
| POST   | `/api/auth/sign-out`      | Logout             |
| GET    | `/api/auth/get-session`   | Current session    |

### Workspaces

| Method | Endpoint                         | Description                          |
| ------ | -------------------------------- | ------------------------------------ |
| GET    | `/api/workspaces`                | All workspaces (admin only)          |
| GET    | `/api/workspaces/me`             | My workspaces (`?archive=true/false`) |
| POST   | `/api/workspaces`                | Create a workspace                   |
| GET    | `/api/workspaces/:id`            | Get one workspace                    |
| PATCH  | `/api/workspaces/:id`            | Update a workspace                   |
| PATCH  | `/api/workspaces/:id/archive`    | Toggle archive                       |
| DELETE | `/api/workspaces/:id`            | Delete a workspace                   |

### Applications

| Method | Endpoint                                   | Description                    |
| ------ | ------------------------------------------ | ------------------------------ |
| GET    | `/api/applications`                        | All my applications            |
| GET    | `/api/applications/:id`                    | Get one application            |
| POST   | `/api/applications/workspace/:workspaceId` | Create inside a workspace      |
| PATCH  | `/api/applications/:id`                    | Update an application          |
| DELETE | `/api/applications/:id`                    | Delete an application          |

### Response format

Routes outside `/api/auth` return a consistent shape:

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

## Project Structure

```
src/
├── application/     # job applications module
├── workspaces/      # workspaces module
├── users/           # user listing
├── common/          # interceptor, middleware
├── config/          # env loader
├── lib/auth/        # Better Auth setup
├── app.module.ts
└── main.ts
```

## Author

Built by [SyntaxAdil](https://github.com/SyntaxAdil) as a first NestJS project.