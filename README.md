After Cloning the repository, we need to install the npm packages and add .env file
the env file contains PORT = 5000, MONGO_URI and JWT_SECRET

to run the code, we need to execute the command npm run server

To view the menu, categories, sub categories and items, one can view without restrictions, the routes are public
but to add a category, update or delete it, one needs to be logged in, and then only it'll work.

To login, first we need to post on the route "http://localhost:5000/api/users" to register a user along while adding data in body:  name, email and password
then with the same credentials we can login.


# Menu Backend API

## Features

- **Categories**: Create, update, get all categories, get a specific category by ID, delete categories.
- **Subcategories**: Create, update, get all subcategories under a specific category, delete subcategories.
- **Items**: Create, update, get all items under a category, get all items which belong to one subcategory, get an item by ID, delete items.

---

## Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A web framework for building APIs in Node.js.
- **MongoDB**: A NoSQL database for storing and retrieving data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB in Node.js.
- **JWT (JSON Web Token)**: For user authentication (optional).
- **Async Handler**: To handle asynchronous code with try-catch handling.



### Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-backend.git
cd ecommerce-backend

