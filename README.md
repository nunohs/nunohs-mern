# GoalSetter MERN Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for setting and tracking goals. This application features a modern TypeScript React frontend with Tailwind CSS, TanStack Query (React Query), and a secure JWT authentication system.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete goals
- Protected routes requiring authentication
- Responsive design using Tailwind CSS
- Toast notifications for user feedback
- TypeScript for type safety
- React Query for efficient data fetching and caching

## Technology Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- Express Async Handler for cleaner async code
- bcrypt for password hashing

### Frontend
- React with TypeScript
- Vite for faster builds and better development experience
- React Router v7 for navigation
- TanStack Query (React Query) for data fetching and caching
- Tailwind CSS for responsive styling
- React Toastify for notifications
- Custom hooks for business logic

## Project Structure

The project follows a feature-based architecture for better organization and scalability:

```
mern-tutorial/
├── backend/               # Backend server code
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   │   ├── authMiddleware.js   # JWT auth middleware
│   │   └── errorMiddleware.js  # Error handling
│   ├── model/             # Mongoose models
│   │   ├── goalModel.js   # Goal schema
│   │   └── userModel.js   # User schema
│   ├── routes/            # Express routes
│   │   ├── goalRoutes.js  # Goal endpoints
│   │   └── userRoutes.js  # Auth endpoints
│   └── server.js          # Entry point
├── frontend/              # React frontend
│   ├── src/
│   │   ├── app/           # App-level config
│   │   │   └── QueryProvider.tsx # React Query setup
│   │   ├── features/      # Feature-based modules
│   │   │   ├── auth/      # Authentication
│   │   │   │   ├── components/ # Auth components
│   │   │   │   ├── hooks/      # Auth hooks
│   │   │   │   └── services/   # Auth API calls
│   │   │   └── goals/     # Goals management
│   │   │       ├── components/ # Goal components
│   │   │       ├── hooks/      # Goal hooks
│   │   │       └── services/   # Goal API calls
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── shared/        # Shared components
│   │   │   └── components/ # Reusable UI components
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   └── index.html         # HTML template
└── package.json           # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mern-tutorial
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

**Development Mode**

To run both the frontend and backend in development mode:
```bash
npm run dev
```

This will start the server at http://localhost:5000 and the frontend at http://localhost:5173.

**Backend Only**
```bash
npm run server
```

**Frontend Only**
```bash
npm run client
```

### Building for Production

Build the React frontend:
```bash
npm run build
```

This will create a production build in the `frontend/dist` directory, which the Express server will serve in production mode.

### Deployment

The application is ready for deployment to platforms like Heroku, Render, or any other platform that supports Node.js applications.

For Heroku deployment:
```bash
heroku create
git push heroku main
```

Make sure to set the following environment variables in your deployment platform:
- `NODE_ENV=production`
- `MONGO_URI=your_production_mongodb_uri`
- `JWT_SECRET=your_secure_jwt_secret`

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/me` - Get user data (Protected)

### Goals
- `GET /api/goals` - Get all user goals (Protected)
- `POST /api/goals` - Create a new goal (Protected)
- `PUT /api/goals/:id` - Update a goal (Protected)
- `DELETE /api/goals/:id` - Delete a goal (Protected)

## Future Enhancements

- Adding unit and integration tests
- Implementing search and filtering for goals
- Adding goal categories and tags
- Goal completion tracking
- Date-based goal planning

## Learn More

This project demonstrates best practices for building a full-stack MERN application including:

- Modern React patterns with TypeScript
- Feature-based architecture for better code organization
- Custom hooks for business logic and API calls
- React Query for efficient data management
- JWT authentication with protected routes
- Consistent error handling with toast notifications
- Responsive UI with Tailwind CSS 