# Welcome to My Pokemon Api
***

## Task
The problem was to create a structured and secure backend service for managing a collection of Pokémon data. The challenge lay in implementing efficient data retrieval using caching (Redis), ensuring secure access to administrative routes via JWT authentication, and providing clear, interactive documentation for other developers.

## Description
I have solved the problem by building a RESTful API using Node.js and Express. Key features include:
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for Pokémon data.
- **Security**: JWT-based authentication to protect administrative endpoints (POST, PUT, DELETE).
- **Performance**: Integrated Redis caching to speed up read operations and reduce file system overhead.
- **Documentation**: Automated Swagger UI generation for easy API testing and exploration.
- **Scalability**: Implementation of pagination for the Pokémon list to handle large datasets gracefully.

## Installation
To install and set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Pokemon-Api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Copy the `.env.example` file to `.env` and fill in your credentials (JWT Secret, Redis URL, etc.):
   ```bash
   cp .env.example .env
   ```

4. **Redis**:
   Ensure you have a Redis server running or access to a Redis instance.

## Usage
To start the server:
```bash
npm start
```
By default, the server runs on `http://localhost:8000`.

### Documentation
You can access the interactive Swagger documentation at:
`http://localhost:8000/api-docs`

### Example Request
```bash
curl http://localhost:8000/api/pokemon?page=1
```

### The Core Team


<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>