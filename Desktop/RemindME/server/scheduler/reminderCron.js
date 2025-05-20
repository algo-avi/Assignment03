const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

cron.schedule('* * * * *', async () => {
  const now = new Date();

  const date = now.toISOString().slice(0,10);      // YYYY-MM-DD
  const time = now.toTimeString().slice(0,5);      // HH:mm

  try {
    const reminders = await Reminder.find({ date, time, sent: false }).populate('user');

    for(let reminder of reminders) {
      if(reminder.reminder_type === 'Email') {
        await sendEmail(reminder.user.email, 'Reminder Notification', reminder.message);
        await Reminder.findByIdAndUpdate(reminder._id, { sent: true });
        console.log(`Email sent to ${reminder.user.email}: ${reminder.message}`);
      }
      // SMS reminder logic can be added later
    }
  } catch(err) {
    console.error('Error sending reminders:', err);
  }
});
