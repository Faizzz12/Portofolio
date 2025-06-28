const Contact = require('../models/Contact');

// Ambil kontak
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data kontak' });
  }
};

// Update kontak
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (contact) {
      const updated = await Contact.findByIdAndUpdate(contact._id, req.body, { new: true });
      res.json(updated);
    } else {
      const newContact = new Contact(req.body);
      await newContact.save();
      res.status(201).json(newContact);
    }
  } catch (err) {
    res.status(400).json({ error: 'Gagal memperbarui data kontak' });
  }
};
