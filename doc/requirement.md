# Job Application Tracker

## 1. Project

A personal web app to track job applications from application → interview → result.

---

## 2. Roles

### User

- Create application
- View applications
- Update application
- Delete application
- Change status
- Search / filter / sort
- View dashboard

### Admin — Later

- View all users
- View all applications
- Manage users

---

# 3. Application Fields

```text
id
companyName
position
status
priority
salary
location
jobType
appliedAt
interviewDate
jobUrl
notes
createdAt
updatedAt
```

### Status

```text
applied
interview
rejected
selected
```

### Priority

```text
high
medium
low
```

### Job Type

```text
full-time
part-time
internship
contract
```

---

# 4. Main Pages

```text
/dashboard
/applications
/applications/create
/applications/:id
/applications/:id/edit
```

### Dashboard

```text
Total Applications
Applied
Interview
Selected
Rejected
High Priority
```

### Applications

```text
Search
Status Filter
Priority Filter
Job Type Filter
Sort
Pagination

Application List/Table
```

### Create

```text
Company
Position
Status
Priority
Salary
Location
Job Type
Applied Date
Interview Date
Job URL
Notes
```

### Details

```text
Company
Position
Status
Priority
Salary
Location
Job Type
Applied Date
Interview Date
Job URL
Notes

[Edit] [Delete]
```

---

# 5. API

Base:

```text
/api/applications
```

## CRUD

```http
POST   /api/applications
GET    /api/applications
GET    /api/applications/:id
PATCH  /api/applications/:id
DELETE /api/applications/:id
```

---

# 6. Create

```http
POST /api/applications
```

```json
{
  "companyName": "ABC Technologies",
  "position": "Frontend Developer",
  "status": "applied",
  "priority": "high",
  "salary": "25000-35000",
  "location": "Dhaka",
  "jobType": "full-time",
  "appliedAt": "2026-10-07",
  "jobUrl": "https://example.com/job",
  "notes": "Waiting for response"
}
```

---

# 7. Get All + Query

```http
GET /api/applications
```

### Filter

```http
GET /api/applications?status=interview
```

```http
GET /api/applications?priority=high
```

```http
GET /api/applications?jobType=full-time
```

### Multiple filters

```http
GET /api/applications?status=applied&priority=high
```

### Search

```http
GET /api/applications?search=frontend
```

Search:

```text
companyName
position
```

### Sort

```http
GET /api/applications?sort=appliedAt&order=desc
```

### Pagination

```http
GET /api/applications?page=1&limit=10
```

### Combined

```http
GET /api/applications?search=frontend&status=applied&priority=high&sort=appliedAt&order=desc&page=1&limit=10
```

---

# 8. Update

```http
PATCH /api/applications/:id
```

Example:

```json
{
  "status": "interview",
  "interviewDate": "2026-10-12"
}
```

Common update:

```text
status
priority
interviewDate
salary
notes
```

---

# 9. Delete

```http
DELETE /api/applications/:id
```

---

# 10. Dashboard API

```http
GET /api/applications/stats
```

Response:

```json
{
  "total": 32,
  "applied": 18,
  "interview": 7,
  "selected": 2,
  "rejected": 5,
  "highPriority": 12
}
```

---

# 11. Backend Flow

```text
Request
   ↓
Middleware
   ↓
Guard
   ↓
Interceptor
   ↓
Pipe / Validation
   ↓
Controller
   ↓
Service
   ↓
Database
   ↓
Response
```

For current local version:

```text
Controller
   ↓
Service
   ↓
Array / Mock Data
```

Later:

```text
Controller
   ↓
Service
   ↓
Mongoose
   ↓
MongoDB
```

---

# 12. Frontend Flow

```text
User Action
    ↓
React Hook Form
    ↓
Zod Validation
    ↓
TanStack Query Mutation
    ↓
NestJS API
    ↓
Database
    ↓
API Response
    ↓
TanStack Query
    ↓
UI Update
```

---

# 13. Main User Flow

```text
Dashboard
    ↓
Applications
    ↓
Create Application
    ↓
Application Created
    ↓
Applications List
    ↓
Open Application
    ↓
Interview
    ↓
Update Status
    ↓
Selected / Rejected
```

---

# 14. MVP Features

```text
✓ Application CRUD
✓ Status
✓ Priority
✓ Search
✓ Filter
✓ Sort
✓ Pagination
✓ Dashboard statistics
✓ Form validation
✓ Error handling
✓ Loading / Empty state
✓ Responsive UI
```

---

# 15. Later Upgrade

```text
MVP
 ↓
MongoDB
 ↓
Mongoose
 ↓
Register/Login
 ↓
JWT
 ↓
Auth Guard
 ↓
request.user
 ↓
Role Guard
 ↓
Admin
 ↓
Swagger
 ↓
Testing
```
