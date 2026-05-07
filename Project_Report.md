# PROJECT REPORT
## Library Management System
### Integrated with IBM Watson Assistant

---

## 1. Abstract
The Library Management System is a comprehensive web-based application designed to digitalize and automate traditional library operations. The system aims to provide a seamless experience for both students and administrators. It features a dual-role architecture where students can browse books, issue items, and track their return dates, while administrators can manage the book catalog, monitor overdue items, and view high-level statistics. Furthermore, the application is integrated with an IBM Watson Assistant AI Chatbot to provide 24/7 automated support to users regarding library rules and queries.

## 2. Introduction
Traditional libraries often face challenges in manually keeping track of inventory, managing user records, and calculating overdue fines. This project resolves these issues by offering a robust, scalable, and user-friendly digital platform. The system enforces business logic such as automated 14-day return deadlines and fine calculations (10 units per overdue day). It utilizes modern web technologies to ensure high performance and an aesthetically pleasing user interface characterized by glassmorphism and a dynamic layout.

## 3. Technology Stack
The application adopts a decoupled architecture separating the backend API and frontend interface:
- **Frontend Framework:** React.js, Vite
- **Styling:** Vanilla CSS (Custom Design System, Glassmorphism, Dark Mode)
- **Backend Framework:** Node.js, Express.js
- **Database:** SQLite (file-based database)
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT), BcryptJS (Password Hashing)
- **AI Integration:** IBM Watson Assistant Web Chat API

## 4. System Architecture
### 4.1. Database Design
The SQLite database consists of three primary tables:
1. **User Table:** Stores `id`, `username`, `password` (hashed), and `role` (Admin or Student).
2. **Book Table:** Stores `id`, `title`, `author`, `category`, and `available` status.
3. **Transaction Table:** Maps Users to Books with `issueDate`, `dueDate`, `returnDate`, `status`, and `fine`.

### 4.2. Security
Authentication is handled via JWT. When a user logs in, the Node.js server validates the hashed credentials and issues a token. All subsequent API requests to protected routes (like issuing a book or adding a new book) require this token in the Authorization header.

## 5. Core Modules
### 5.1. Authentication Module
Provides secure login and registration interfaces. The system distinguishes between an Admin and a Student, routing them to their respective tailored dashboards post-login.

### 5.2. Admin Module
Administrators have elevated privileges. They can:
- Add new books to the library inventory.
- Delete existing books.
- View a dashboard with statistics: Total Books, Issued Books, and Overdue Transactions.

### 5.3. Student Module
Students can:
- Browse the entire library catalog.
- Search for books by title, author, or category.
- Issue available books (which sets an automated 14-day return policy).
- Return books and view any accumulated fines.

### 5.4. AI Chatbot Integration
The IBM Watson Assistant is globally embedded across the application interface. It acts as a digital librarian, assisting users with navigation, library timings, and issuing rules without requiring human intervention.

## 6. Conclusion
The developed Library Management System successfully fulfills its objective of providing a complete, automated, and secure platform for managing library resources. The integration of modern UI principles and an AI chatbot ensures that the system is not only functional but also highly engaging and futuristic. The use of SQLite provides a lightweight, zero-configuration data layer, making the software highly portable and easy to deploy in educational environments.
