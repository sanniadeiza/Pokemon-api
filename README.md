# Pokemon API Backend Project

This is a backend API providing data about > 1,000 different Pokémon.

## Project Structure
- API Framework: **Node.js with Express**
- Data Storage: Local JSON file (`data/pokemon.json`) to keep infrastructure requirements low and portable.
- Authentication: **JWT (JSON Web Tokens)** OAuth standard.
- Caching: **Redis** middleware implemented for GET routes.
- Documentation: **Swagger UI** for integrated endpoint testing.

## Prerequisites
1. [Node.js](https://nodejs.org/) installed on your machine.
2. [Redis](https://redis.io/download) installed and running locally for caching to work (the API will still function and bypass caching if Redis is offline).

## Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Generate the Database (Data Gathering)**
   To pull the required > 1,000 rows of data safely from PokeAPI into our local database store, run:
   ```bash
   node scripts/fetchData.js
   ```

3. **Start the API Server**
   ```bash
   npm start
   ```
   (Starts server on port 3000)

## API Documentation

### Swagger UI
The easiest way to view the API documentation and test endpoints is through Swagger. Once the server is running, navigate to:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Postman Documentation Guide
To document this API using Postman:
1. Open up Postman and create a new **Workspace** > **Blank Collection**. Name it "Pokemon API".
2. **Add a GET request:** Click "Add a request", set the method to `GET`, URL to `http://localhost:3000/api/pokemon?page=1` and save it to the collection.
3. **Add a Login request:** Set method to `POST`, URL to `http://localhost:3000/api/auth/login`. In the `Body` tab, choose `raw` and `JSON`, and paste: `{"username": "admin", "password": "password"}`.
4. **Publish Documentation:** Click on your collection name to open the overview tab, find the `...` menu, and select **View Documentation**. Click **Publish** on the top right. 
5. Add your generated Postman URL here:  
   **[Link to my Postman Docs](#)**

## Features Implemented

- **Part 1:** Fetched 1,100 Pokemon rows using a custom script via node `https`.
- **Part 2:**
  - Express.js backend.
  - JWT Authentication on Admin routes (`POST`, `PUT`, `DELETE`).
  - Read operations (`GET`) are public.
  - Pagination implemented (max 20 per page).
  - Redis cache implemented to intercept `GET` request URLs and cache them for 1 hour.
  - Swagger UI documentation built-in.

---

## AWS Deployment Guide (Free Tier)

To deploy this project for $0 using AWS EC2:

1. **Create an EC2 Instance:**
   - Log into AWS Console and go to **EC2** > **Launch Instance**.
   - Choose **Ubuntu Server 22.04 LTS** (which is Free Tier eligible).
   - Choose instance type **t2.micro**.
   - Create a new Key Pair (.pem) and download it to SSH into the machine later.
   - Under **Network Settings**, click Edit. Add a Security Group rule allowing **Custom TCP** on port `3000` from Anywhere (`0.0.0.0/0`), as well as allowing SSH (port 22).
   - Launch Instance.

2. **Push to GitHub:**
   - Initialize a local git repository. 
   - Create a `.gitignore` file and add `node_modules/` and `.env` to it.
   - Commit your code and push it up to a new public GitHub repository.

3. **SSH into EC2 and Setup:**
   - On your local terminal, navigate to where you saved the `.pem` file from step 1.
   - Run: `ssh -i "your-key.pem" ubuntu@<your-ec2-public-ip>`
   - Once inside the server, update packages and install Node and Redis:
     ```bash
     sudo apt update && sudo apt upgrade -y
     sudo apt install nodejs npm redis-server -y
     ```

4. **Clone and Run the App:**
   - Clone your github repository: `git clone <your-repo-url>`
   - `cd pokemon-api`
   - `npm install`
   - Fetch the data: `node scripts/fetchData.js`
   - Start the server using a process manager like PM2 so it runs in the background:
     ```bash
     sudo npm install -g pm2
     pm2 start server.js
     ```

5. **Test Your Live API:**
   - In your browser, open `http://<your-ec2-public-ip>:3000/api-docs` to view your hosted API!
