const Profile = require('../models/Profile');

// Ambil profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data profile' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (profile) {
      const updated = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
      res.json(updated);
    } else {
      const newProfile = new Profile(req.body);
      await newProfile.save();
      res.status(201).json(newProfile);
    }
  } catch (err) {
    res.status(400).json({ error: 'Gagal memperbarui data profile' });
  }
};
