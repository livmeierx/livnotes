const path = require('path');
const fs = require('fs')

// npm package that allows for unique ids to be created
var uniqid = require('uniqid');


// routing
module.exports = (app) => {

  // GET /api/notes s as JSON.
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  // POST /api/notes  
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);

    let userNote = {
      title: req.body.title,
      text: req.body.text,

      id: uniqid(),
    };

    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

  });


  // DELETE /api/notes/:id  
  app.delete('/api/notes/:id', (req, res) => {
   
    let db = JSON.parse(fs.readFileSync('db/db.json'))
   
    let deleteNotes = db.filter(item => item.id !== req.params.id);
   
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
    
  })
};