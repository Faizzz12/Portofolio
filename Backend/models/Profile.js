const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  about: String,
  skills: {
    software: [
      {
        name: String,
        level: Number,
      }
    ],
    languages: [
      {
        name: String,
        level: Number,
      }
    ],
    personal: [String]
  },
  education: [
    {
      institution: String,
      degree: String,
      startYear: String,
      endYear: String
    }
  ],
  experience: [
    {
      position: String,
      description: String,
      startYear: String,
      endYear: String
    }
  ],
  organizations: [
    {
      name: String,
      position: String,
      year: String,
      description: String
    }
  ],
  activities: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
