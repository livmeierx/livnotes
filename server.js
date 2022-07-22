const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes to files
require('./routes/apiRoutes')(app);
require('./routes/indexRoutes')(app);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

