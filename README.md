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
2. [Redis](https://redis.io/download) installed and running (or use Upstash as configured in `.env`).

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
   (Starts server on port 8000 by default)

## API Documentation

### Swagger UI
Once the server is running, navigate to:  
[http://localhost:8000/api-docs](http://localhost:8000/api-docs)

### Postman Documentation
To get your public Postman documentation link:
1. In Postman, open your **Collection**.
2. Click the **"..." (More actions)** menu next to the collection name.
3. Select **"Share"**.
4. Click the **"Publish"** tab.
5. Click the orange **"Publish"** button to generate a public URL.
6. Copy that URL and paste it below:

**[Link to Postman Documentation](PASTE_YOUR_LINK_HERE)**

## Features Implemented

- **Part 1:** Fetched 1,100 Pokemon rows using a custom script via node `https`.
- **Part 2:**
  - Express.js backend.
  - JWT Authentication on Admin routes (`POST`, `PUT`, `DELETE`).
  - Read operations (`GET`) are public.
  - Pagination implemented (max 20 per page).
  - Redis cache implemented with TLS support (Upstash compatible).
  - Swagger UI documentation built-in.

---

## AWS Deployment Guide (Free Tier)

To deploy this project for $0 using AWS EC2:

1. **Create an EC2 Instance:**
   - Log into AWS Console and go to **EC2** > **Launch Instance**.
   - Choose **Ubuntu Server 22.04 LTS** (Free Tier eligible).
   - Choose instance type **t2.micro**.
   - Create a new Key Pair (.pem) and download it.
   - Under **Network Settings**, add a Security Group rule allowing **Custom TCP** on port `8000` from Anywhere (`0.0.0.0/0`), as well as SSH (port 22).

2. **Push to GitHub:**
   - Initialize a local git repository. 
   - Ensure `.gitignore` includes `node_modules/` and `.env`.
   - Push your code to a public GitHub repository.

3. **SSH into EC2 and Setup:**
   - Run: `ssh -i "your-key.pem" ubuntu@<your-ec2-public-ip>`
   - Install Node and Redis:
     ```bash
     sudo apt update && sudo apt upgrade -y
     sudo apt install nodejs npm redis-server -y
     ```

4. **Clone and Run the App:**
   - `git clone <your-repo-url>`
   - `cd pokemon-api`
   - `npm install`
   - `node scripts/fetchData.js`
   - Start using PM2:
     ```bash
     sudo npm install -g pm2
     pm2 start server.js
     ```

5. **Test Your Live API:**
   - Open `http://<your-ec2-public-ip>:8000/api-docs` to view your hosted API!
