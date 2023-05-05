const express = require('express');
const htmlController = require('./controller/htmlController');
const notesController = require('./controller/notesController');
const Notes= require('./models/notes');
// Import models to sync with the database
// const models = require('./models');
const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notes_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// turn on connection to db and server
const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to MongoDB');
  });
  const handleError = (err, res) => {
    res.status(500).send({
      success: false,
      message: 'There was an error processing your request',
      error: err
    });
  };
  app.use((err, req, res, next) => {
    handleError(err, res);
  });
  
app.use('/api', notesController);
app.use('/', htmlController);

  app.listen(PORT, () => console.log('Now listening'));
;