
# User Management

This project is a User Management System that handles user registration, authentication, and data retrieval on the backend. The frontend offers an elegant interface with forms, dashboards, and data presentation, all while maintaining security and responsiveness.

## Features

User Registration and Authentication:
- API endpoints for user registration and implemented JWT-based authentication for secure user login.

Data Retrieval and Filtering:
- Developed API endpoints to retrieve data from the database.
  Implemented filtering, sorting, and pagination options for efficient data manipulation.

Error Handling Middleware:
- error handling middleware to manage and send appropriate error responses to clients.

Authorization Middleware:
- Created a middleware to manage user roles and permissions, protecting sensitive routes from unauthorized access.

Unit Testing:
- unit tests using testing frameworks Jest to ensure the reliability of key API endpoints.

Frontend User Interface:
- user registration and login forms using React components for seamless user interaction.

Data Listing and Filtering UI:
- Developed a user-friendly UI to present and filter data retrieved from the backend.
  Allow users to sort, paginate, and explore data with ease.

State Management:
- Implemented global state management using  Redux for efficient data sharing across components.

Form Validation:
- Enhanced user experience with form validation, ensuring accurate user input during registration and login.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` 
`DB_URL`
`JWT_SECRET`

PORT: The port number on which the application will run.

DB\_URL: The URL of the MongoDB database to be used.

JWT\_SECRET: The secret key for JSON Web Token (JWT) encryption and decryption.


## Installation

Install user-management with npm

```bash
cd User-Management
  cd client
    npm install
  cd server
    npm install
```
    
## Run Locally

Clone the project

```bash
  git clone 
```

Go to the project frontend directory

```bash
  cd assignment
    cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


Go to the project backend directory

```bash
  cd Assignment
    cd server
```

Install dependencies

```bash
  npm install
```

setup .env

```bash
  PORT, DB_URL, JWT_SECRET
```


Start the server

```bash
  npm start
```
