import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      setSuccess('Registration successful! You can login now.');
      setError('');
      onRegister();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        <label>Name:</label>
        <input
          type='text'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
      </div>
      <div>
        <label>Email:</label>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
      </div>
      <button type='submit'>Register</button>
    </form>
  );
}
