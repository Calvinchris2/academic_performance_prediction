import React, { useState } from "react";
import axios from "axios";

function PredictionPage() {
  const [studytime, setStudytime] = useState("");
  const [failures, setFailures] = useState("");
  const [actEncoded, setActEncoded] = useState("");
  const [absences, setAbsences] = useState("");
  const [G1, setG1] = useState("");
  const [G2, setG2] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the FastAPI backend
    const studentData = {
      studytime: parseInt(studytime),
      failures: parseInt(failures),
      act_encoded: parseInt(actEncoded),
      absences: parseInt(absences),
      G1: parseFloat(G1),
      G2: parseFloat(G2),
    };

    try {
      // Send a POST request to FastAPI backend for prediction
      const response = await axios.post("http://127.0.0.1:8000/predict/", studentData);
      
      // Set prediction data
      setPrediction(response.data.predicted_G3);
      setError(""); // Reset error if prediction is successful
    } catch (err) {
      setError("Error fetching prediction. Please try again.");
      console.error("Error:", err);
    }
  };

  // Full-screen background and content styling
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: 'url(https://images.unsplash.com/photo-1521747116042-5e1e3f10e10b) no-repeat center center/cover',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    margin: '0',
    overflow: 'hidden', // Ensure no scrolling by default
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
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
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    backgroundColor: '#f8f8f8',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
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
        <h2 style={titleStyle}>Predict Academic Performance</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Study Time:</label>
            <input
              type="number"
              value={studytime}
              onChange={(e) => setStudytime(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Failures:</label>
            <input
              type="number"
              value={failures}
              onChange={(e) => setFailures(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>ACT Encoded:</label>
            <input
              type="number"
              value={actEncoded}
              onChange={(e) => setActEncoded(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Absences:</label>
            <input
              type="number"
              value={absences}
              onChange={(e) => setAbsences(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Grade 1 (G1):</label>
            <input
              type="number"
              step="0.1"
              value={G1}
              onChange={(e) => setG1(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Grade 2 (G2):</label>
            <input
              type="number"
              step="0.1"
              value={G2}
              onChange={(e) => setG2(e.target.value)}
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
            Predict
          </button>
        </form>

        {error && <p style={errorStyle}>{error}</p>}
        {prediction !== null && (
          <h3 style={{ marginTop: '20px' }}>Predicted Grade 3 (G3): {prediction}</h3>
        )}
      </div>
    </div>
  );
}

export default PredictionPage;
