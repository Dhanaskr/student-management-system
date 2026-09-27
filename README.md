# Student Management System

A full-stack Student Management System built using React, Node.js, Express.js, and PostgreSQL.

The application allows users to add, view, edit, delete, and search student records through a responsive dashboard interface.

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

---

## Features

- Add Student
- View All Students
- View Single Student
- Edit Student
- Delete Student
- Search Students
- Student Count
- Department Count
- Academic Year Count
- Success and Error Messages
- Form Validation
- Responsive Dashboard UI

---

## Project Structure

```text
student-management-system/
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentTable.jsx
│   │   │
│   │   ├── services/
│   │   │   └── studentApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── 01_create_students_table.sql
│
├── docs/
│   └── full-project-learning-report.md
│
├── .gitignore
└── README.md