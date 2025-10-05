# 🧠 Smart Event Management System

A full-stack web application built using **React (Vite)**, **Express.js**, and **MongoDB (Mongoose)**.  
The system allows users to register, log in, view and manage events, while admins can analyze participation and event metrics through an analytics dashboard.

---

## 🚀 Features
- User authentication (Login / Register)
- Event creation, registration, and dashboard
- Admin analytics and statistics
- REST API with Express.js
- MongoDB with Mongoose for data persistence
- Modular front-end built using React + Vite
- Secure `.env` configuration
- API integration for event data and analytics

---

## 🧩 Project Structure

### 🖥️ Client
Frontend built with **React + Vite**.

```
client/
│
├── src/
│   ├── components/
│   │   ├── AdminAnalytics.jsx
│   │   ├── EventCarousel.jsx
│   │   ├── EventDashboard.jsx
│   │   ├── LoginModal.jsx
│   │   ├── RegisterModal.jsx
│   │   ├── SiteFooter.jsx
│   │   └── TopBar.jsx
│   ├── pages/
│   ├── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

### ⚙️ Server
Backend powered by **Express.js** and **Mongoose**.

```
server/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── data/
│   │   └── seedData.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Event.js
│   │   └── User.js
│   ├── routes/
│   │   ├── analyticsRoutes.js
│   │   ├── authRoutes.js
│   │   ├── devRoutes.js
│   │   └── eventRoutes.js
│   └── index.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚡ Installation & Setup

### 🖥️ 1. Clone the Repository
```bash
git clone https://github.com/your-username/smart-event-management.git
cd smart-event-management
```

---

### 🧩 2. Setup the Server
```bash
cd server
npm install
npm run dev
```

- The server runs on `http://localhost:5000`
- Make sure MongoDB is running locally or update your `.env` with your MongoDB Atlas URI.

**Example `.env`:**
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smart_event
JWT_SECRET=your_secret_key
```

---

### 🎨 3. Setup the Client
```bash
cd client
npm install
npm run dev
```

- The client runs on `http://localhost:5173` (Vite default)
- Make sure the backend is running before loading the app.

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite), Axios, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ORM) |
| Auth | JSON Web Tokens (JWT) |
| Analytics | Custom route logic with MongoDB aggregation |
| Deployment | Vercel / Render (optional) |

---

## 📸 Screenshots

| Page | Description |
|------|--------------|
| ![Login](screenshots/login.png) | User login modal |
| ![Dashboard](screenshots/dashboard.png) | Event dashboard showing active events |
| ![Admin Analytics](screenshots/analytics.png) | Admin analytics dashboard |

*(Add your screenshots inside a `/screenshots` folder.)*

---

## 🧾 API Overview

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Authenticate user |
| `/api/events` | GET | Get all events |
| `/api/events` | POST | Create new event |
| `/api/analytics` | GET | Get event analytics data |

---

## ⚙️ Scripts

### In the `client` folder:
```bash
npm run dev      # Run Vite development server
npm run build    # Build for production
```

### In the `server` folder:
```bash
npm run dev      # Start Express server with nodemon
npm start        # Start Express server normally
```

---

## 🧰 Environment Variables

Create a `.env` file in both `client/` and `server/` directories.

**Client .env**
```
VITE_API_BASE_URL=http://localhost:5000
```

**Server .env**
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```
