const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  const { message, date, time, reminder_type } = req.body;
  if(!message || !date || !time || !reminder_type) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const reminder = new Reminder({
      user: req.user.id,
      message,
      date,
      time,
      reminder_type
    });
    await reminder.save();
    res.status(201).json({ message: 'Reminder saved', reminder });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
