# Inventory Management System

A full-stack MERN application for managing inventory with authentication.

## Features

- User authentication (signup/login)
- Protected routes
- Product management (CRUD operations)
- Wishlist functionality
- Responsive design with Bootstrap

## Tech Stack

- **Frontend**: React, React Router, Axios, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB account

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The application will be available at http://localhost:5173

## Project Structure

```
├── backend/
│   ├── Middleware/
│   │   └── authMiddleware.js
│   ├── modles/
│   │   ├── AuthModel.js
│   │   ├── productModule.js
│   │   ├── userModule.js
│   │   └── wishlistModel.js
│   ├── Route/
│   │   ├── authRoutes.js
│   │   ├── productRoute.js
│   │   ├── userRoute.js
│   │   └── wishlistRoute.js
│   ├── app.js
│   └── config.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Routing/
│   │   │   ├── About.jsx
│   │   │   ├── AuthForm.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Wishlist.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── index.html
└── README.md
```