import React, { useState } from 'react';
import axios from 'axios';

export default function ReminderForm({ token }) {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reminderType, setReminderType] = useState('Email');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await axios.post(
        'http://localhost:5000/api/reminders',
        {
          message,
          date,
          time,
          reminder_type: reminderType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess('Reminder saved successfully!');
      setMessage('');
      setDate('');
      setTime('');
      setReminderType('Email');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save reminder');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Reminder</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Message:</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Date:</label>
        <input
          type='date'
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label>Time:</label>
        <input
          type='time'
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div>
        <label>Reminder Type:</label>
        <select
          value={reminderType}
          onChange={(e) => setReminderType(e.target.value)}
        >
          <option value='Email'>Email</option>
          <option value='SMS'>SMS</option>
        </select>
      </div>

      <button type='submit'>Set Reminder</button>
    </form>
  );
}
