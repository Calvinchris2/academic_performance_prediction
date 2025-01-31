import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Ensures the container takes the full viewport height
    width: '100vw', // Ensures the container takes the full viewport width
    background: 'url(https://images.unsplash.com/photo-1521747116042-5e1e3f10e10b) no-repeat center center/cover',
    position: 'relative',
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden', // Prevents scrolling if the content exceeds the screen
  };

  const overlayStyle = {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '600px',
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.7)',
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    animation: 'fadeIn 2s ease-in-out',
  };

  const descriptionStyle = {
    fontSize: '1.25rem',
    marginBottom: '25px',
    lineHeight: '1.5',
    animation: 'fadeIn 3s ease-in-out',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 30px',
    fontSize: '1.25rem',
    textDecoration: 'none',
    borderRadius: '5px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
    transform: 'scale(1.1)',
  };

  const fadeInKeyframes = `
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{fadeInKeyframes}</style> {/* Injecting the keyframe animation directly */}
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Welcome to Academic Performance Prediction</h1>
        <p style={descriptionStyle}>
          Predict the academic performance of students based on input data and enhance their learning experience.
        </p>
        <Link 
          to="/login" 
          style={buttonStyle} 
          onMouseOver={(e) => e.target.style = {...buttonStyle, ...buttonHoverStyle}} 
          onMouseOut={(e) => e.target.style = buttonStyle}
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
