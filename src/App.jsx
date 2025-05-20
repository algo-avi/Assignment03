import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ReminderForm from './components/ReminderForm';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login'); // 'login' | 'register' | 'reminder'

  useEffect(() => {
    if(token) setView('reminder');
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('login');
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      {!token && view === 'login' && (
        <>
          <Login onLogin={setToken} />
          <p>
            No account?{' '}
            <button onClick={() => setView('register')}>Register here</button>
          </p>
        </>
      )}

      {!token && view === 'register' && (
        <>
          <Register onRegister={() => setView('login')} />
          <p>
            Already have account?{' '}
            <button onClick={() => setView('login')}>Login here</button>
          </p>
        </>
      )}

      {token && (
        <>
          <button onClick={logout} style={{ float: 'right' }}>
            Logout
          </button>
          <ReminderForm token={token} />
        </>
      )}
    </div>
  );
}
