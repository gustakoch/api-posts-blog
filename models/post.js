const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url_image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = model('Post', PostSchema);
