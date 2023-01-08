const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  manufacturer: String,
  description: String,
  mainPepper: String,
  imageUrl: String,
  heat: {
    type: Number,
    min: 1,
    max: 10
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  usersLiked: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  usersDisliked: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Sauce', sauceSchema);
