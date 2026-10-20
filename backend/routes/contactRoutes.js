const express = require('express');
const { submitContactForm, getMessages } = require('../controllers/contactController');
const router = express.Router();

router.post('/', submitContactForm);
// In a real app, this GET route should be protected by an admin middleware
router.get('/', getMessages);

module.exports = router;
