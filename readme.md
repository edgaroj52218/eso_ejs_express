# Express EJS Layout with Named Routes

## Introduction

Welcome to the **Express EJS Layout with Named Routes** project! This application demonstrates how to build a structured and maintainable web server using **Express.js** with **EJS** templating. By implementing named routes and using EJS partials for consistent layouts, this project serves as an excellent learning tool for understanding key concepts in modern web development.

## Features

- **Express.js Server:** Handles routing and server-side logic.
- **EJS Templating:** Renders dynamic HTML pages with reusable partials.
- **Named Routes:** Centralized route management for easy maintenance.
- **Static Assets:** Serves CSS and JavaScript files from the `public` directory.
- **Dynamic Routing:** Supports dynamic user profiles with route parameters.
- **Error Handling:** Custom 404 error page for undefined routes.

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** (Node Package Manager)

You can download Node.js from [https://nodejs.org/](https://nodejs.org/), which includes npm.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/express-ejs-layout-demo.git
   cd express-ejs-layout-demo
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the required npm packages.

   ```bash
   npm install
   ```

## Project Structure

```
express-ejs-layout-demo
├── node_modules
├── package.json
├── package-lock.json
├── src
│   ├── app.js
│   ├── helpers
│   │   └── urlHelper.js
│   └── routes
│       ├── routes.js
│       └── users.js
├── views
│   ├── partials
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── users.ejs
│   ├── userProfile.ejs
│   └── 404.ejs
└── public
    ├── css
    │   └── style.css
    ├── js
    │   └── script.js
    └── images
```

- **src/**: Contains the server-side code.
  - **app.js**: Main application file.
  - **helpers/urlHelper.js**: Utility for generating URLs based on named routes.
  - **routes/**: Defines application routes.
    - **routes.js**: Central route registry.
    - **users.js**: Router for user-related routes.
- **views/**: EJS templates for rendering HTML pages.
  - **partials/**: Reusable components like header and footer.
  - **index.ejs, about.ejs, users.ejs, userProfile.ejs, 404.ejs**: Page-specific templates.
- **public/**: Serves static assets.
  - **css/style.css**: Stylesheet.
  - **js/script.js**: JavaScript file.

## Usage

1. **Start the Server**

   Run the following command to start the Express server:

   ```bash
   npm start
   ```

   You should see the message:

   ```
   Server is running on http://localhost:3000
   ```

2. **Access the Application**

   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the home page.

   - **Home Page:** [http://localhost:3000/](http://localhost:3000/)
   - **About Page:** [http://localhost:3000/about](http://localhost:3000/about)
   - **Users Page:** [http://localhost:3000/users](http://localhost:3000/users)
   - **User Profile Page:** Click on "View Profile" next to any user on the Users page (e.g., [http://localhost:3000/users/alice](http://localhost:3000/users/alice))
   - **404 Page:** Navigate to a non-existent route like [http://localhost:3000/unknown](http://localhost:3000/unknown)

## Troubleshooting

### Error: `url is not a function`

**Cause:** The `url` helper is not properly made available in the EJS templates.

**Solution:**

1. **Check `app.js` Configuration**

   Ensure that `url` is correctly imported and assigned to `app.locals`.

   ```javascript
   // src/app.js

   const { url } = require('./helpers/urlHelper');
   const routes = require('./routes/routes');

   // ...

   // Make the URL helper and routes available in all EJS templates
   app.locals.url = url;
   app.locals.routes = routes;
   ```

2. **Verify `urlHelper.js` Export**

   Ensure that `urlHelper.js` correctly exports the `url` function.

   ```javascript
   // src/helpers/urlHelper.js

   const routes = require('../routes/routes');

   function url(name, params = {}) {
       let path = routes[name];
       if (!path) {
           throw new Error(`Route name "${name}" not found in route registry.`);
       }

       for (const [key, value] of Object.entries(params)) {
           path = path.replace(`:${key}`, encodeURIComponent(value));
       }

       return path;
   }

   module.exports = { url };
   ```

3. **Restart the Server**

   After making changes, restart the server to apply updates.

   ```bash
   npm start
   ```

4. **Check EJS Template Syntax**

   Ensure that the `url` helper is used correctly in your EJS templates.

   ```html
   <!-- Example in header.ejs -->
   <a href="<%= url('home') %>">Home</a>
   ```

## Conclusion

You've successfully built an Express.js application using EJS templating with named routes and partials for a consistent layout. This setup promotes maintainability and scalability, making it easier to manage and extend your application.

## Next Steps

To further enhance your application, consider exploring the following:

- **Database Integration:** Connect to a database like MongoDB or PostgreSQL to store and manage data.
- **User Authentication:** Implement login and registration functionalities using libraries like Passport.js.
- **API Development:** Create RESTful APIs to interact with frontend frameworks or mobile applications.
- **Advanced Error Handling:** Develop comprehensive error handling for various HTTP status codes.
- **Deployment:** Deploy your application to platforms like Heroku, Vercel, or AWS for public access.

## License

This project is open-source and available under the [MIT License](LICENSE).
