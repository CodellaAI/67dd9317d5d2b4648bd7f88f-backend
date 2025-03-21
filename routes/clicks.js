
const express = require('express');
const router = express.Router();
const Click = require('../models/Click');

// POST - Log a new click
router.post('/log-click', async (req, res) => {
  try {
    const { timestamp, action } = req.body;
    
    const newClick = new Click({
      timestamp: timestamp || new Date().toISOString(),
      action: action || 'button_clicked'
    });
    
    await newClick.save();
    
    res.status(201).json({
      success: true,
      message: 'Click logged successfully',
      data: newClick
    });
  } catch (error) {
    console.error('Error logging click:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log click',
      error: error.message
    });
  }
});

// GET - Retrieve all clicks (for testing/verification)
router.get('/clicks', async (req, res) => {
  try {
    const clicks = await Click.find().sort({ timestamp: -1 });
    
    res.status(200).json({
      success: true,
      count: clicks.length,
      data: clicks
    });
  } catch (error) {
    console.error('Error retrieving clicks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve clicks',
      error: error.message
    });
  }
});

module.exports = router;
