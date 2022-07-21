const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    //GET request
    app.get("/api/notes", (req, res) => {
        console.log("Execuiting GET notes request");

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        console.log("GET request - returning notes data: " + JSON.stringify(data));

        res.json(data);
    });

    //POST request
    app.post("/api/notes", (req, res) => {
        const newNote = req.body;

        console.log("POST request - New Note: " + JSON.stringify(newNote));

        newNote.id = uuidv4();

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        data.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(data));

        res.json(data);
    });

    //DELETE request
    app.delete("/api/notes/:id", (req, res) => {
        let noteId = req.params.id.toString();

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        const newData = data.filter( note => note.id.toString() !== noteId);
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        
        res.json(newData);
    });
};
