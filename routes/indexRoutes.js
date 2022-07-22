const path = require('path');

module.exports = (app) => {

  // GET /notes 
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  // GET * to return index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  })
};