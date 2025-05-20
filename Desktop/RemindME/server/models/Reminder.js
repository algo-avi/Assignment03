const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required:true },
  date: { type: String, required:true },  // YYYY-MM-DD
  time: { type: String, required:true },  // HH:mm
  reminder_type: { type: String, enum: ['Email', 'SMS'], default: 'Email' },
  sent: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reminder', ReminderSchema);
