const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const allNotes = require('./db/db.json');

const express = require('express');
const app = express();

// adding middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

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

