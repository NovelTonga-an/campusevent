import { useState } from 'react';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-panel">
      <div className="login-panel__intro">
        <span className="login-panel__eyebrow">Campus Events</span>
        <h2 className="login-panel__title">Sign in to your account.</h2>
        <p className="login-panel__description">
          Access the admin dashboard to manage events, review listings, and keep your campus programming organized.
        </p>
        <div className="login-panel__credentials">
          <span>Demo credentials</span>
          <p style={{ margin: 0, color: '#fff7e8', fontSize: '0.9rem' }}>
            Username: <strong>admin</strong>
          </p>
          <p style={{ margin: 0, color: '#fff7e8', fontSize: '0.9rem' }}>
            Password: <strong>password123</strong>
          </p>
        </div>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form__field">
          <span>Username</span>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(''); }}
            required
            autoComplete="username"
          />
        </div>
        <div className="login-form__field">
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <p className="login-form__error">{error}</p>}
        <button type="submit" className="login-form__submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;