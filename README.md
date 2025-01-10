# CauseBridge - Server Side

CauseBridge is a volunteer management platform designed to streamline the creation and management of volunteer opportunities. This repository contains the server-side logic and API endpoints for the platform.

## Purpose
The server-side application provides the backend support for the CauseBridge platform, including database interactions, authentication, and API endpoints for managing volunteer posts and user actions.

## Frontend Repository
[Visit CauseBridge Frontend Repository](https://github.com/salmanfxrsi/causebridge-frontend)

## Live Server URL
[Deployed Server URL](https://cause-bridge-server-side.vercel.app/)

## Key Features
- **User Authentication**:
  - Email/password-based authentication.
  - JWT-based private route protection.
- **Volunteer Post Management**:
  - Create, read, update, and delete volunteer posts.
  - Search functionality for volunteer posts.
- **Volunteer Requests**:
  - Handle user requests to join volunteer opportunities.
  - Automatically decrement available slots for volunteers.
- **Secure Configuration**:
  - Firebase and MongoDB credentials secured with environment variables.
- **Dynamic Data Handling**:
  - Pagination and sorting of volunteer posts.
  - Status updates for volunteer requests.

## Technology Stack
- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose for ORM)
- **Authentication**: Firebase Auth, JSON Web Token (JWT)
- **Environment Management**: dotenv
- **Deployment**: Vercel

## API Endpoints
### Authentication
- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Log in a user and return a JWT.

### Volunteer Posts
- **GET** `/api/posts` - Retrieve all volunteer posts (supports pagination and sorting).
- **GET** `/api/posts/:id` - Retrieve a specific volunteer post.
- **POST** `/api/posts` - Create a new volunteer post (protected route).
- **PUT** `/api/posts/:id` - Update a volunteer post (protected route).
- **DELETE** `/api/posts/:id` - Delete a volunteer post (protected route).

### Volunteer Requests
- **POST** `/api/requests` - Submit a new volunteer request.
- **GET** `/api/requests` - Retrieve user-specific volunteer requests.
- **DELETE** `/api/requests/:id` - Cancel a volunteer request.

## Environment Variables
Ensure you have a `.env` file in the root directory with the following keys:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
```

## NPM Packages Used
- **express**: Web framework for building APIs.
- **mongoose**: MongoDB object modeling for Node.js.
- **jsonwebtoken**: Implementation of JWT for secure authentication.
- **dotenv**: Loads environment variables from `.env` file.
- **cors**: Middleware for enabling CORS.
- **bcryptjs**: For hashing passwords securely.
- **firebase-admin**: Firebase integration for authentication.

## Contact
For any queries or support, feel free to contact the developer at [salmanxprivate@gmail.com].

---
Thank you for watching **CauseBridge Server Side Repository**!
