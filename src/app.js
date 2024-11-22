// src/app.js

const { url } = require('./helpers/urlHelper');
const routes = require('./routes/routes');

// ...

// Make the URL helper and routes available in all EJS templates
app.locals.url = url;
app.locals.routes = routes;