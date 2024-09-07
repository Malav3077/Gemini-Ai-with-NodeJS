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
      <header className="app-header">
        <h1 className="app-title">Gemini AI</h1>
      </header>
      <main className="app-main">
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
            {isLoading ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>
        <div className="result-container">
          {error && <p className="error">{error}</p>}
          {result && (
            <div className="result">
              <h2>AI Response:</h2>
              <p>{result}</p>
            </div>
          )}
        </div>
      </main>
      <footer className="app-footer">
        <p>Made by Malav</p>
      </footer>
    </div>
  );
};

export default App;