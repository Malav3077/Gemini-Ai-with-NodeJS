import React, { useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setError(`Error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testAPI = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/test');
      const data = await response.json();
      alert('API test successful. Check console for details.');
    } catch (error) {
      alert('API test failed. Check console for details.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Gemini AI</h1>
      {/* <button onClick={testAPI} className="test-btn">Test API</button> */}
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Ask AI'}
        </button>
      </form>
      <div className="result">
        {error && <p className="error">{error}</p>}
        {result && <p>{result}</p>}
      </div>
      <footer className="footer">
        <p>Made by Malav</p>
      </footer>
    </div>
  );
};

export default App;
