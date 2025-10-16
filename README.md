# Woo-Commerce Full Stack Project

## Project Description
This project is a **Woo-Commerce integrated full-stack application**. It allows fetching, ingesting, and retrieving product data from a Woo-Commerce store through a version-based API. The project includes basic authentication and a user-friendly dashboard for product management.

---

## Authentication

The application supports user authentication with the following endpoints:

- **Register**: `/register` → Create a new account  
- **Login**: `/login` → Login to an existing account  
- **Logout**: `/logout` → Logout and maintain session management  

---

## Application Overview

- **Dashboard**: `/` → Displays overall dashboard, product card view, and product evaluation/filtering options.  
- **Features**:
  - Ingest product information from Woo-Commerce API
  - Evaluate and filter products
  - Maintain user sessions  

---

## Server API Endpoints

### Version
- **v0.1** → Current version of the backend API

### Authentication APIs
- `POST /api/v0.1/authendication/register` → Create a new account  
- `POST /api/v0.1/authendication/login` → Login to an account  
- `GET /api/v0.1/authendication/session/chk` → Check session status  
- `POST /api/v0.1/authendication/session/logout` → Logout operation  

### Application APIs
- `GET /api/v0.1/products` → Retrieve all products  
- `POST /api/v0.1/ingests/product/` → Ingest products from Woo-Commerce  
- `POST /api/v0.1/segments/evaluate/` → Evaluate products with filters  

---

## Technologies Used

### Frontend
- ReactJS  
- React Router DOM  
- Tailwind CSS  

### Backend
- ExpressJS  
- Axios  
- Nodemon  
- MySQL2  
- CORS  

---

## Deployment
- **Frontend Deployment**: Firebase  
- **Project Link**: [Woo-Commerce Project](https://woo-commerce-project.web.app/)  

---

## Project Setup

> **Note:** Before initializing a GitHub repository, make sure to clone the project using:  
```bash
git clone https://github.com/suria003/Full-Stack-WooCommerce-Project
```

## Frontend

### App Directory
```bash
cd FrontEnd
```

### Install Packages
```bash
npm install
```

### Start App
```bash
npm run dev
```

---

## Backend

### App Directory
```bash
cd BackEnd
```

### Install Packages
```bash
npm install express
npm install cors
npm install nodemon
pm install mysql2
npm install axios
```

### Start App
```bash
npm run dev
```

---

## Database Setup

### Query File
`Backend/config/Query.sql`

### Instructions
Execute the SQL queries inside your database.

### Database Configuration
Update the database settings in `db.js` inside the backend folder to match your environment.

---

## Notes
- API versioning ensures future backward compatibility.  
- Basic authentication is implemented for secure user sessions.  
- The project is modular and scalable for adding more features in future versions.  
- The frontend and backend are decoupled, making deployment and maintenance easier.