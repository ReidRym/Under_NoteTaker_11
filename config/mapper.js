const Notes = require('./models/notes');

module.exports = {
  map: (data) => {
    return new Notes({
      id: data.id,
      title: data.title,
      text: data.text
    });
  }
};