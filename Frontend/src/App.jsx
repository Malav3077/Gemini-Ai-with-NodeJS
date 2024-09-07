import React, { useState } from 'react';
import './App.css';


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
    const response = await fetch('https://makeaibyking.onrender.com/api/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

  },
  body: JSON.stringify({ question: input }),
});

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    setResult(data.result);
  } catch (error) {
    console.error('Full error:', error);
    setError(`Error occurred: ${error.message}`);
  } finally {
    setIsLoading(false);
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
