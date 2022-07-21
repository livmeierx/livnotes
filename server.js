const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// adding middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// routes
require('./routes/apiRoutes')(app);
require('./routes/mainRoutes')(app);

// listening for host and port
app.listen(PORT, function() {
    console.log(`API server now on port ${PORT}!`);
});

