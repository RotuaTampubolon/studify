const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

module.exports = router; 