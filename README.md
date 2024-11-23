
# Stock Management

This is a Stock Management Application built with a ReactJS front end and an Express.js back end. The app enables users to manage suppliers, categories, and stock items efficiently


## Table of content

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Front-End Setup](#front-end-setup)
  - [Back-End Setup](#back-end-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Overview

The Stock Management Application provides an organized and intuitive interface for managing a business’s stock, including items, categories, and suppliers. It allows users to add, view, update, and delete stock items and categorize them accordingly.
## Features

- Manage Suppliers: Add, edit, and remove suppliers for stock items.
- Manage Categories: Create and categorize items under - specific categories.
- Stock Management: Add, update, and delete stock items.
- User Authentication: Secured with login and authorization for data access.
- Data Visualization: View and filter stock data efficiently.


## Technologies

* Front End
   - ReactJS
   - Ant Design for UI components
   - CSS for styling
* Back End
   - Node.js with Express
   - TypeScript for type safety
   - MongoDB as the database
## Installation

* Front-End setup

```bash
git clone https://github.com/Abdelkaderbh/stock-management.git

cd stock-management/admin

npm install 

npm start
```

* Back-End setup

```bash
git clone https://github.com/Abdelkaderbh/stock-management.git

cd stock-management/server

npm install 

Create a .env file in the backend folder (create config folder) with the following variables:
PORT=4000
DATABASE_URL=your_mongodb_uri
SECRET_KEY=your_jwt_secret

npm run dev
```
## Usage/Examples
* Sign Up / Log In to access the application.
* Add Suppliers: Navigate to the "Suppliers" section to add new suppliers.
* Create Categories: Use the "Categories" section to define product categories.
* Manage Stock: Add stock items, update quantities, and remove items as necessary.


## API Reference

#### Get all items

Here are some of the primary API routes:

* Suppliers

GET /suppliers/all: List all suppliers

POST /suppliers/add: Add a new supplier

PUT /suppliers/update/:id: Update a supplier

DELETE /suppliers/delete/:id: Remove a supplier

* Categories

GET /categories/all: List all categories

POST /categories/add: Add a new category

PUT /categories/update/:id: Update a category

DELETE /categories/delete/:id: Remove a category



* Products

GET /product/all: List all categories

POST /product/add: Add a new category

PUT /product/update/:id: Update a category

DELETE /product/delete/:id: Remove a category


## Contributing

Contributions are always welcome please follow these steps!

Fork the repository.

Create a new feature branch: git checkout -b feature-name.
Commit your changes: git commit -m 'Add feature'.

Push to the branch: git push origin feature-name.

Submit a pull request.

