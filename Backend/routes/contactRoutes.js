const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', contactController.getContact);
router.put('/', authMiddleware, contactController.updateContact);

module.exports = router;
