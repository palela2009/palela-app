const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('../utils/jwt');
const authMiddleware = require('../middleware/auth');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, password });

    if (email === 'test@example.com' && password === 'password123') {
      const userId = '12345';
      const token = generateToken(userId);
      
      return res.json({
        success: true,
        token,
        user: {
          id: userId,
          email,
          name: 'Test User'
        }
      });
    }

    console.log('Login failed: Invalid credentials');
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/verify', authMiddleware, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.userId,
        email: 'test@example.com',
        name: 'Test User'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
