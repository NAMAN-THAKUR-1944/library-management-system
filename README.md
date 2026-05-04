# Library Management System

A modern, full-stack Library Management System built with Node.js, Express, Sequelize (SQLite), React, and Vite. This application provides dual-role access for Admins and Students, book management, a fully automated issue/return workflow with fine calculations, and is integrated with IBM Watson Assistant for 24/7 AI help.

## Features

- **Dual-Role Authentication:** Separate logic and dashboards for Admins and Students.
- **Admin Capabilities:** Add, remove, and manage library books. View overall statistics.
- **Student Capabilities:** Browse books, search by title/author/category, issue and return books.
- **Automated Rules:** Books are issued for 14 days. Returning late results in a fine (10 units/day).
- **Modern UI:** Built using a custom glassmorphism design system without external CSS frameworks, satisfying high-end UI/UX standards.
- **AI Chatbot:** IBM Watson Assistant is globally embedded in the bottom corner to answer library queries.

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, Lucide React (Icons).
- **Backend:** Node.js, Express, Sequelize ORM (SQLite), JWT, BcryptJS.
- **Database:** SQLite (file-based database, zero configuration required).

## Setup & Run Instructions

This project requires [Node.js](https://nodejs.org/) to be installed.

### 1. Setup Backend
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
npm install
npm start
```
The backend server will run at `http://localhost:5000`. It will automatically create `database.sqlite` in the project root.

### 2. Setup Frontend
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run typically at `http://localhost:5173`. Open this URL in your browser.

## Testing the Application

1. **Register** as a Student and then as an Admin.
2. Login to the **Admin** account. Go to the "Books" page to add a few books to the catalog.
3. Login to the **Student** account. Go to the "Books" page, browse the catalog, and click "Issue Book".
4. Go to the "Dashboard" to see your issued books.
5. Notice the **IBM Watson Chatbot** floating widget in the bottom right corner of all pages.

## Project Structure
- `backend/` - Node.js Express API.
  - `models/` - Sequelize database schemas.
  - `routes/` - RESTful API routes.
  - `middleware/` - JWT auth validation.
- `frontend/` - React application.
  - `src/pages/` - Application views.
  - `src/components/` - Reusable UI elements like Navbar and WatsonChat.
  - `src/index.css` - Custom styling and design system.
