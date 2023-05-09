const express = require("express");
const app = express();

const router = require("express").Router();
const path = require("path");
const fs = require("fs");
let database = require("../db/db.json");

// base URL localhost:3001/api
router.get("/notes", (req, res) => {
  database = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(database);
});

// router.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/notes.html"));
// });
router.post("/notes", function (req, res) {
  // Check if the data already exists in the database
  let existingData = false;
  for (let i = 0; i < database.length; i++) {
    if (database[i].title === req.body.title && database[i].text === req.body.text) {
      existingData = true;
    }
  }
  // If the data does not already exist, add it to the database
  if (!existingData) {
    var newNote = {
      id: Math.random(),
      title: req.body.title,
      text: req.body.text,
    };
    database.push(newNote);
  }
  fs.writeFileSync(
    "./db/db.json",
    JSON.stringify(database),
    function (err, res) {
      if (err) {
        throw err;
      }
    }
  );
  res.json(database);
});

// Added DELETE request to notesController.js file
router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;

  // let database = fs.readFileSync("./db/db.json", "utf8");
  // database = JSON.parse(database);

  database = database.filter(note => note.id != noteId);

  fs.writeFileSync("./db/db.json", JSON.stringify(database),err => {
    if (err) {
      throw err;
    }

   
  });
  res.json(database);
});

module.exports = router;
