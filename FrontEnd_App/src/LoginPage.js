import React, { useState } from 'react';
import App from './App'
import "./LoginPage.css"


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const validCredentials = [
      { username: '0xb7C29Fc6EdD4ea72DEf52F022c32B161019b9D64', password: '11' },
      { username: '6F166F166F166F16', password: '22' },
      { username: '4B2A4B2A4B2A4B2A', password: '33' },
    ];
    const matchedCredentials = validCredentials.find(
      (credentials) => credentials.username === username && credentials.password === password
    );
    if (matchedCredentials) {
      setIsLoggedIn(true);
      setUsername(matchedCredentials.username);
    } else {
      setError('Invalid username or password');
    }
  };

  if (isLoggedIn) {
    return <App username={username} />;
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>VERIFYIT</h1>
        {error && <p className="error-message">{error}</p>}
        <label>
          Authority Address:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
