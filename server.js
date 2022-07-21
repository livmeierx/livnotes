const PORT = process.env.PORT || 3001;

const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const allNotes = require('./db/db.json');

// adding middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// route handlers to GET requests
app.get('api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(_dirname, './public/notes.html'));
});

app.get('/', (req,res) => {
    res.sendFile(path.join(_dirname, './public/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, './public/index.html'));
});

// function to create new note
function createNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
    notesArray = [];

    if (notesArray.length === 0)
    notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(_dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

// HTTP POST request
app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, allNotes);
    res.json(newNote);
});

// function to delete note
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(_dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

// listening for host and port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

