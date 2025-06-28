const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  email: String,
  whatsapp: String,
  instagram: String,
  github: String,
  linkedin: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
