import React, { useState } from 'react';
import "./Recommendation.css";

function Recommendation() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async (e) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);
    setLoading(true);

    try {
      const recommendBody = { input1: month, input2: year, input3: salePrice };
      const recommendResponse = await fetch('http://localhost:3000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recommendBody),
      });

      if (!recommendResponse.ok) {
        const text = await recommendResponse.text();
        throw new Error(`Recommendation HTTP error! status: ${recommendResponse.status}, response: ${text}`);
      }

      const recommendData = await recommendResponse.json();
      setRecommendation(recommendData.recommendation);
    } catch (err) {
      console.error('Recommendation Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendation-container">
      <h1>Get Recommendation</h1>
      <form onSubmit={handleRecommend}>
        <div className="input-group">
          <label>
            Month (1-12):
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min="1"
              max="12"
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Year (1900-2100):
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="1900"
              max="2100"
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Sale Price:
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Recommending...' : 'Get Recommendation'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {recommendation !== null && (
        <div className="result">
          <h3>Recommendation: {recommendation.toFixed(4)}</h3>
        </div>
      )}
    </div>
  );
}

export default Recommendation;