const express = require('express');
const htmlController = require('./controller/htmlController');
const notesController = require('./controller/notesController');




  
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api', notesController);
app.use('/', htmlController);



  app.listen(PORT, () => console.log('Now listening'));
;