// import React, { useState } from 'react';
// import axios from 'axios';
// import './Prediction.css';

// function Prediction() {
//     const [month, setMonth] = useState('');
//     const [year, setYear] = useState('');
//     const [prediction, setPrediction] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
//         setPrediction(null);

//         try {
//             const response = await axios.post('http://localhost:3000/predict', {
//                 input1: month,
//                 input2: year
//             }, {
//                 timeout: 5000
//             });
//             setPrediction(response.data.prediction);
//         } catch (err) {
//             if (err.code === 'ECONNREFUSED') {
//                 setError('Cannot connect to the backend server. Ensure the server is running at http://localhost:3001.');
//             } else if (err.response) {
//                 setError(err.response.data?.error || 'Error from server. Please try again.');
//             } else if (err.request) {
//                 setError('No response from the server. Check your network connection or server status.');
//             } else {
//                 setError('Error making prediction: ' + err.message);
//             }
//             console.error('Prediction error:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="prediction-container">
//             <h1>Model Prediction</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="input-group">
//                     <label>Month (1-12):</label>
//                     <input
//                         type="number"
//                         min="1"
//                         max="12"
//                         value={month}
//                         onChange={(e) => setMonth(e.target.value)}
//                         required
//                         placeholder="Enter month (1-12)"
//                     />
//                 </div>
//                 <div className="input-group">
//                     <label>Year (1900-2100):</label>
//                     <input
//                         type="number"
//                         min="1900"
//                         max="2100"
//                         value={year}
//                         onChange={(e) => setYear(e.target.value)}
//                         required
//                         placeholder="Enter year (1900-2100)"
//                     />
//                 </div>
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Predicting...' : 'Predict'}
//                 </button>
//             </form>

//             {prediction !== null && (
//                 <div className="result">
//                     <h3>Prediction Result:</h3>
//                     <p>{prediction.toFixed(2)}</p>
//                 </div>
//             )}

//             {error && (
//                 <div className="error">
//                     <p>{error}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// // export default Prediction;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Prediction.css';

// function Prediction({ onPredictionUpdate }) {
//     const [month, setMonth] = useState(new Date().getMonth() + 1);
//     const [year, setYear] = useState(new Date().getFullYear());
//     const [prediction, setPrediction] = useState(null);
//     const [loading, setLoading] = useState(false);
    
//     const fetchPrediction = async () => {
//         setLoading(true);
//         setPrediction(null);
        
//         try {
//             const response = await axios.post('http://localhost:3000/predict', {
//                 input1: month,
//                 input2: year
//             });
//             setPrediction(response.data.prediction);
//             onPredictionUpdate(response.data.prediction);
//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchPrediction();
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetchPrediction();
//     };

//     return (
//         <div className="prediction-container">
//             <h1>Model Prediction</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>Month (1-12):</label>
//                 <input
//                     type="number"
//                     min="1"
//                     max="12"
//                     value={month}
//                     onChange={(e) => setMonth(Number(e.target.value))}
//                     required
//                 />
//                 <label>Year (1900-2100):</label>
//                 <input
//                     type="number"
//                     min="1900"
//                     max="2100"
//                     value={year}
//                     onChange={(e) => setYear(Number(e.target.value))}
//                     required
//                 />
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Predicting...' : 'Predict'}
//                 </button>
//             </form>
//             {prediction !== null && (
//                 <div className="result">
//                     <h3>Prediction Result:</h3>
//                     <p>{prediction.toFixed(2)}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Prediction;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Prediction.css';

function Prediction() {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchPrediction = async () => {
        setLoading(true);
        setPrediction(null);
        
        try {
            const response = await axios.post('http://localhost:3000/predict', {
                input1: month,
                input2: year
            });
            const predictionValue = response.data.prediction;
            setPrediction(predictionValue);

            // Store prediction in localStorage with "month-year" as the key
            const key = `prediction-${month}-${year}`;
            localStorage.setItem(key, predictionValue);
        } catch (error) {
            console.error('Error:', error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPrediction();
    }, []); // Fetch only once on component mount

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPrediction();
    };

    return (
        <div className="prediction-container">
            <h1>Model Prediction</h1>
            <form onSubmit={handleSubmit}>
                <label>Month (1-12):</label>
                <input
                    type="number"
                    min="1"
                    max="12"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    required
                />
                <label>Year (1900-2100):</label>
                <input
                    type="number"
                    min="1900"
                    max="2100"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Predicting...' : 'Predict'}
                </button>
            </form>
            {prediction !== null && (
                <div className="result">
                    <h3>Prediction Result:</h3>
                    <p>{prediction.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default Prediction;
