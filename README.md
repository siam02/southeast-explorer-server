# Southeast Explorer - Backend

Welcome to the backend repository of Southeast Explorer, your go-to platform for exploring the captivating beauty of Southeast Asia and beyond!

## Features

- **Secure Authentication**: Manage user authentication and authorization.
- **Tourist Spot Management**: Handle CRUD operations for tourist spots.
- **User Data Management**: Store and manage user-specific data.
- **Environment Variables**: Safeguard sensitive Firebase config keys and MongoDB credentials with environment variables.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/siam02/southeast-explorer-server.git
```

2. Install dependencies:

```bash
cd southeast-explorer-backend
npm install
```

3. Create a .env file in the root directory and add your MongoDB credentials:

 ```bash
MONGODB_URI=your-mongodb-uri
```

4. Start the development server:

```bash
nodemon index.js
```
