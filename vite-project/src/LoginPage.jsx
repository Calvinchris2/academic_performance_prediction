import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Define initial credentials
    const validUsername = 'admin';
    const validPassword = 'password';

    // Check if entered credentials match
    if (username === validUsername && password === validPassword) {
      // If valid, redirect to prediction page
      navigate('/predict');
    } else {
      // Show error message if credentials are invalid
      setError('Invalid username or password');
    }
  };

  // Inline styles for full-screen effect
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full screen
    width: '100vw', // Full width
    background: 'url(https://images.unsplash.com/photo-1521747116042-5e1e3f10e10b) no-repeat center center/cover',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    margin: '0', // Ensure no margin is applied to the body element
  };

  const overlayStyle = {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)', // Overlay for visibility
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.7)',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px', // More padding for better spacing inside the input
    margin: '10px 0',
    borderRadius: '5px', // Rounded corners for inputs
    border: '1px solid #ddd',
    fontSize: '1rem', // Adjust font size for readability
    backgroundColor: '#f8f8f8',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box', // Ensures padding doesn't make input overflow
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '1.25rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
  };

  const errorStyle = {
    color: 'red',
    marginTop: '10px',
  };

  // Handling button hover effect
  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = '#45a049';
    e.target.style.transform = 'scale(1.05)';
  };

  const handleButtonMouseOut = (e) => {
    e.target.style.backgroundColor = '#4CAF50';
    e.target.style.transform = 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h2 style={titleStyle}>Login to Predict</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={handleButtonHover}
            onMouseOut={handleButtonMouseOut}
          >
            Login
          </button>
        </form>

        {error && <p style={errorStyle}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
