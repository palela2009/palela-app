const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = {
      id: req.userId,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+995 555 123 456'
    };
    
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    
    const updatedProfile = {
      id: req.userId,
      firstName,
      lastName,
      email,
      phone
    };
    
    res.json({ success: true, profile: updatedProfile, message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
