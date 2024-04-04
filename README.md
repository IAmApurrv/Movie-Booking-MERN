# MERN Movie Booking Project

[About](#about) | [Running the Project](#running-the-project) | [Screenshots](#screenshots) | [Dependencies](#dependencies) | [Usage](#usage) | [Folder Structure](#folder-structure)



## About
This is a full-stack movie booking project developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project consists of two modules: Admin and User. The Admin module allows administrators to add and delete movies, while the User module enables users to sign up, log in, book movies, view movie details, delete bookings, and delete their accounts.



## Running the Project

To run the Book-Store-MERN project locally, follow these steps:

### 1. Clone the Repository

```
git clone https://github.com/IAmApurrv/Movie-Booking-MERN.git
```

### 2. Navigate to the Backend Folder

```
cd backend
```

### 3. Install Backend Dependencies

```
npm install
```

### 4. Start the Backend Server

```
npm start
```

The backend server will start running on port 5000.

### 5. Open Another Terminal and Navigate to the Frontend Folder

```
cd frontend
```

### 6. Install Frontend Dependencies

```
npm install
```

### 7. Start the Frontend Server

```
npm start
```

The frontend server will start running on port 3000.

### 8. Access the Application

Once both servers are running, you can access the application through your web browser at http://localhost:3000.



## Screenshots

- **Home**: ![Home](screenshots/Home.png)

- **Admin Authentication**: ![Admin Authentication](screenshots/Admin-Authentication.png)

- **Add Movie**: ![Add Movie](screenshots/Add-Movie.png)

- **Admin Dashboard**: ![Admin Dashboard](screenshots/Admin-Dashboard.png)

- **Delete Movie Confirmation**: ![Delete Movie Confirmation](screenshots/Delete-Movie-Confirmation.png)

- **User Signup**: ![User Signup](screenshots/User-Signup.png)

- **User Login**: ![User Login](screenshots/User-Login.png)

- **All Movies**: ![All Movies](screenshots/All-Movies.png)

- **Movie Details Booking**: ![Movie Details Booking](screenshots/Movie-Details-Booking.png)

- **User Dashboard**: ![User Dashboard](screenshots/User-Dashboard.png)

- **Delete Booking Confirmation**: ![Delete Booking Confirmation](screenshots/Delete-Booking-Confirmation.png)

- **Delete Account Confirmation**: ![Delete Account Confirmation](screenshots/Delete-Account-Confirmation.png)



## Dependencies

### Backend
- **Node.js**: Runtime environment for JavaScript on the server side.
- **Express.js**: Web application framework for Node.js, used for building RESTful APIs.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Implementation of JSON Web Tokens (JWT) for authentication.
- **cors**: Middleware for handling Cross-Origin Resource Sharing (CORS) in Express.js.
- **nodemon**: Utility for automatic server restarts during development.

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **react-material-ui-carousel**: Component library for creating carousels in React applications.
- **@mui/material**: React components library following the Material-UI design system.
- **@mui/icons-material**: Icon library for Material-UI.
- **@emotion/react** and **@emotion/styled**: Library for styling React components with CSS-in-JS.
- **react-router-dom**: Routing library for React applications.
- **axios**: HTTP client for making requests from the frontend to the backend.
- **react-redux**: Official React bindings for Redux state management.
- **@reduxjs/toolkit**: Utility package for efficient Redux development.



## Usage

### Admin Module
- Log in to the admin dashboard.
- Add a new movie with details.
- Delete existing movies.

### User Module
- Sign up for a new account.
- Log in to book movies.
- View movie details.
- Book a movie.
- Delete bookings.
- Delete user account.



## Folder Structure

```
mern-movie-booking/
│
├── backend/                # Backend server code
│   ├── controllers/        # Request handlers for routes
│   ├── models/             # MongoDB models
│   ├── routes/             # Express routes
│   ├── .env                # Environment variables
│   └── app.js           # Express server setup
│
├── frontend/               # React.js frontend code
│   ├── public/             # Static files
│   ├── src/                # React components and logic
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Pages or views of the application
│   │   ├── api/            # Functions for making API requests to the backend
│   │   ├── store/          # Redux actions, reducers, and store configuration
│   │   ├── App.js          # Main component
│   │   ├── index.js        # Entry point for React application
│   │   └── ...
│   │
│   └── ...
│
├── .gitignore              # Specifies intentionally untracked files to ignore
└── README.md               # Project documentation
```


