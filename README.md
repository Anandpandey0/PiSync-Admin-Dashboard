# PiSync-Admin-Dashboard



A full-stack application with separate frontend and backend directories. This project uses `concurrently` to run both frontend and backend development servers simultaneously.

## Getting Started

### Install dependencies

Run the following command to install dependencies for both frontend and backend:

```bash
npm run install-all

Add the .env to both frontend and the backend

Add the value of mongodb uri as per your choice or else choose below value 
MONGO_URI=mongodb+srv://pisync-admin:1234@cluster0.hiodfqg.mongodb.net/


Sample .env for frontend is as follows :
NEXT_PUBLIC_BACKEND_URL='http://localhost:8080'

Sample .env for backend is as follows:
PORT = 8080
MONGO_URI=mongodb+srv://pisync-admin:1234@cluster0.hiodfqg.mongodb.net/



```bash 

Start the development server
npm run dev

