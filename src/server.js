// src/app.js

const express = require('express');
const path = require('path');
const routes = require('./routes/routes'); // Import the route registry
const { url } = require('./helpers/urlHelper'); // Import the URL helper

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory where the template files are located
app.set('views', path.join(__dirname, '../views'));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Make the URL helper and routes available in all EJS templates
app.locals.url = url;
app.locals.routes = routes;

// Routes
app.get(routes.home, (req, res) => {
    const data = {
        title: 'Home Page',
        message: 'Welcome to the Home Page!'
    };
    res.render('index', data);
});

app.get(routes.about, (req, res) => {
    const data = {
        title: 'About Us',
        message: 'Learn more About Us.'
    };
    res.render('about', data);
});

app.get(routes.users, (req, res) => {
    const data = {
        title: 'Users',
        message: 'List of Users',
        users: [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 35 },
            { name: 'Keith', age: 49 }

        ]
    };
    res.render('users', data);
});

// Handle 404 - Page Not Found
app.use((req, res) => {
    res.status(404).render('404', { title: '404: Page Not Found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
