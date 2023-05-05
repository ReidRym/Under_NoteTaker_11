const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:3001/notes_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        console.log('Connected to MongoDB');
      });
  }
};