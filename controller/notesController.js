const express = require('express');
const app = express();

const router = require('express').Router();
const path = require('path');
const fs = require('fs');
let database = require('../db/db.json');

// base URL localhost:3001/api 
 router.get('/notes', (req, res) => {
database=JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
res.json(database);
 });

 router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
    
     });
app.post("/notes", function(req, res) {
    var newNote = {
        id: Math.random(),
        title: req.body.title,
        text: req.body.text
    };
    database.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(database), function(err, res) {
        if (err) {
            throw err;
        }
    });
    res.json(database);
});
     module.exports = router;
     