const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// const allNotes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes to files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

