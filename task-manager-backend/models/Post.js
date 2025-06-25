const mongose = require('mongoose');

const postSchema = new mongose.Schema({
  title: String,
  body: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongose.model('Post', postSchema);