# 💸 Expense Tracker — Take Control of Your Money


A modern, full-stack **Expense Tracker** built with the **MERN stack** to help users manage daily expenses, organize transactions, analyze spending, and make smarter financial decisions. Featuring a responsive interface, secure user authentication, real-time expense management, powerful filters, and currency conversion, this application makes personal finance management simple and convenient.

<p align="center">

  ![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![Vite](https://img.shields.io/badge/Vite-Fast_Builds-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</p>

---

## 📌 Table of Contents

- [🌟 Overview](#-overview)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Architecture](#️-project-architecture)
- [⚙️ Installation and Setup](#️-installation-and-setup)
- [🔐 Environment Configuration](#-environment-configuration)
- [▶️ Running the Application](#️-running-the-application)
- [🔌 API Overview](#-api-overview)
- [🌍 Deployment](#-deployment)
- [🔒 Security](#-security)
- [🔮 Future Enhancements](#-future-enhancements)
- [👨‍💻 Author](#-author)

---

## 🌟 Overview

Managing personal finances becomes easier when every expense is organized in one place.

**Expense Tracker** is a full-stack web application that allows users to create an account, securely access their dashboard, record expenses, filter transactions, review spending summaries, and convert currency values.

The application uses **React** for the user interface, **Node.js and Express.js** for backend APIs, and **MongoDB** for persistent data storage.

🎯 **Project Goal:** Build a practical, responsive, and user-friendly financial management application while applying full-stack development concepts.

---

## 🚀 Features

### 💰 Expense Management
- ➕ Add new expenses with relevant details.
- 📋 View recorded transactions in an organized list.
- ✏️ Update existing expense details through the available API.
- 🗑️ Delete expenses when they are no longer needed.
- 💾 Persist expense records using MongoDB.

### 🔐 Authentication & User Management
- 📝 User registration and login.
- 🔑 Token-based authentication using JSON Web Tokens (JWT).
- 🔒 Password hashing with `bcryptjs`.
- 👤 User-specific expense management.
- 🚪 Logout functionality with local authentication data cleared.

### 🔎 Smart Search & Filtering
- 🔍 Search expenses by name.
- 🏷️ Filter transactions by category.
- 📅 Apply start-date and end-date filters.
- ♻️ Reset filters to restore the complete expense list.
- ⚡ Update displayed results dynamically.

### 📊 Spending Summary
- 💵 Calculate total spending for the currently filtered expenses.
- 📈 Review expense information through a dedicated summary panel.
- 🧾 Keep transactions organized for easier financial tracking.

### 🌐 Currency Converter
- 💱 Convert currency values using an external exchange-rate service.
- 🧮 Calculate conversions using the rates provided by the configured API.
- 🌍 Make currency comparisons more convenient.

### 📱 Modern User Interface
- 🎨 Clean and intuitive dashboard.
- 📲 Responsive layout for different screen sizes.
- ⚡ Fast frontend development and production builds with Vite.
- 🧩 Reusable React components.
- 🔔 Loading and error feedback for data-fetching operations.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ React.js | Interactive user interface |
| ⚡ Vite | Frontend development server and build tool |
| 🎨 CSS3 | Styling and responsive layouts |
| 🟨 JavaScript | Application logic |
| 🟢 Node.js | Backend JavaScript runtime |
| 🚂 Express.js | REST API development |
| 🍃 MongoDB | Persistent database |
| 🦫 Mongoose | MongoDB object modeling |
| 🔐 JSON Web Token | Authentication |
| 🔒 bcryptjs | Password hashing |
| 🌐 REST APIs | Frontend-backend communication |
| 💱 Frankfurter API | Currency exchange rates, if configured |
| 🧰 Git & GitHub | Version control and source management |

---

## 🏗️ Project Architecture

The application follows a separated frontend-backend architecture.

```text
                  👤 USER
                    │
                    ▼
          ⚛️ React + Vite Frontend
                    │
                    ▼
              🌐 REST APIs
                    │
                    ▼
           🟢 Node.js + Express
                    │
           ┌────────┴────────┐
           ▼                 ▼
     🔐 Authentication   💰 Expense APIs
           │                 │
           └────────┬────────┘
                    ▼
              🍃 MongoDB
```

### 🧩 Key Components

- **`App.jsx`** — Main dashboard, authentication state, expense loading, filtering, and application layout.
- **`Auth.jsx`** — Registration and login interface.
- **`ExpenseForm.jsx`** — Expense entry form.
- **`ExpenseList.jsx`** — Transaction listing, search, category/date filters, and deletion controls.
- **`SummaryPanel.jsx`** — Expense summary.
- **`CurrencyConverter.jsx`** — Currency conversion interface.
- **`api.js`** — Frontend API communication and authentication token handling.
- **`auth.js`** — Backend authentication middleware.
- **`User.js`** and **`Expense.js`** — Mongoose database models.
- **`authRoutes.js`** and **`expenseRoutes.js`** — Backend API routes.

---

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 📋 Prerequisites

Install the following before getting started:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or an accessible MongoDB instance

### 1️⃣ Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Expense_Tracker
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository's actual URL.

### 2️⃣ Install Dependencies

From the project root, run:

```bash
npm run install:all
```

This installs the frontend and backend dependencies using the configured root script.

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the `backend` folder by copying `.env.example`.

**Windows PowerShell:**

```powershell
Copy-Item backend/.env.example backend/.env
```

Open `backend/.env` and configure the values described in the next section.

### 4️⃣ Start the Application

From the project root, run:

```bash
npm run dev
```

This starts the frontend and backend together using the configured development script.

Open the local frontend URL printed by Vite in your terminal. It is commonly:

**http://localhost:5173**

---

## 🔐 Environment Configuration

The backend uses environment variables to manage configuration and secrets.

Example `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
```

### 📝 Configuration Guide

| Variable | Description |
|---|---|
| `PORT` | Port used by the backend server |
| `NODE_ENV` | Application environment |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `CLIENT_URL` | Frontend origin allowed by the backend, when configured |

⚠️ **Important:** Use your actual MongoDB connection string and a strong, unique JWT secret. Never commit your real `.env` file or expose credentials publicly.

For production, set the corresponding environment variables in your hosting provider's dashboard.

---

## ▶️ Running the Application

### 🧑‍💻 Development Mode

Run the complete application:

```bash
npm run dev
```

### 🏗️ Build the Frontend

Create a production build:

```bash
npm run build
```

### 🚀 Start the Backend

Run the backend independently:

```bash
npm run backend
```

The backend can also be started directly from the backend directory:

```bash
cd backend
npm start
```

---

## 🔌 API Overview

The backend exposes REST endpoints for authentication and expense management.

### 🔐 Authentication Routes

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate an existing user |
| `GET` | `/api/auth/me` | Retrieve the authenticated user's information |

### 💰 Expense Routes

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/expenses` | Retrieve expenses, with supported filters |
| `POST` | `/api/expenses` | Create a new expense |
| `PUT` | `/api/expenses/:id` | Update an expense |
| `DELETE` | `/api/expenses/:id` | Delete an expense |

🔑 **Authentication:** Expense routes that require a logged-in user should be called with the JWT in the request's `Authorization` header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

📌 These endpoints use the `/api` prefix configured in the frontend. Actual access requirements and response formats depend on the backend route implementation.

---

## 🌍 Deployment

The application can be deployed using separate hosting services for its frontend and backend.

| Layer | Suggested Platform |
|---|---|
| ⚛️ Frontend | [Vercel](https://vercel.com/) |
| 🟢 Backend | [Render](https://render.com/) |
| 🍃 Database | [MongoDB Atlas](https://www.mongodb.com/atlas) |

### 🚀 Deployment Checklist

- ✅ Create a production build of the frontend.
- ✅ Deploy the backend and confirm the server starts successfully.
- ✅ Configure the MongoDB connection string.
- ✅ Set a strong production JWT secret.
- ✅ Configure the frontend's `VITE_API_URL` environment variable with the backend API base URL.
- ✅ Configure backend CORS to allow the deployed frontend origin.
- ✅ Test registration, login, expense creation, filtering, and deletion in production.

**Note:** Update environment variables and hosting settings according to your actual deployment. Deployment is not automatic simply by following these steps.

---

## 🔒 Security Best Practices

- 🔐 Hash passwords before storing them.
- 🛡️ Protect private endpoints with authentication middleware.
- 🔑 Keep JWT secrets and database credentials out of source control.
- 👤 Ensure users can access only their own expense records.
- 🧹 Validate incoming data on the backend.
- 🌐 Restrict production CORS origins to trusted websites.
- 🔒 Use HTTPS in production.

---

## 🔮 Future Enhancements

The following features could make the application even more powerful:

- 📊 Interactive charts and spending analytics.
- 🎯 Monthly budgets and spending-limit alerts.
- 📅 Monthly and yearly financial reports.
- 📥 Export transactions to CSV or PDF.
- 🔁 Recurring expense management.
- 💡 Personalized saving recommendations.
- 🔔 Notifications for budget limits.

---

## 🎓 Learning Outcomes

This project demonstrates practical experience with:

- ⚛️ Building component-based applications using React.
- 🔗 Connecting a frontend to backend REST APIs.
- 🟢 Creating APIs with Node.js and Express.js.
- 🍃 Managing application data with MongoDB and Mongoose.
- 🔐 Implementing JWT authentication and password hashing.
- 🔎 Handling search, filtering, and asynchronous requests.
- ⚙️ Managing environment variables and deployment configuration.
- 📱 Building responsive user interfaces.

---

## 👨‍💻 Author

### **Agrim Vij**

🎓 B.Tech — Computer Science and Engineering

💻 Interested in web development, problem-solving, and building practical software applications.

🔗 **GitHub:** [Visit My GitHub Profile](https://github.com/agrim2004)

---

## ⭐ Show Your Support

If you find this project useful or interesting:

🌟 Give the repository a star on GitHub.

🍴 Fork the project and explore new ideas.

💬 Share suggestions and improvements.

---
