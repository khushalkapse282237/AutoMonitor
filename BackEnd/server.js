

import express from 'express';
import cors from 'cors';
// import { fetchLast15DaysVehicleCount, fetchLast15MonthsVehicleCount, fetchLast15YearsVehicleCount } from './db/data-curd.js';
import { fetchLast15DaysVehicleCount, fetchLast15MonthsVehicleCount, fetchLast15YearsVehicleCount } from './db/data-curd.js';
import { predictRoute } from '../BackEnd/ml_model/Predict/predictRoutes.js';
// import { recommendRoute } from '../BackEnd/ml_model/Recommend/recommendRoutes.js';

const app = express();
const port = process.env.PORT || 3000; // Use environment port if available

// Middleware
app.use(cors({ 
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'], // Specify allowed methods
  credentials: true // If you need to send cookies
}));
app.use(express.json());

// Input validation middleware
const validateDateParams = (req, res, next) => {
  const { email, year, month, day } = req.query;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  if (year && !/^\d{4}$/.test(year)) {
    return res.status(400).json({ error: 'Invalid year format' });
  }
  
  if (month && !/^(1[0-2]|[1-9])$/.test(month)) {
    return res.status(400).json({ error: 'Invalid month format' });
  }
  
  if (day && !/^(3[01]|[12]\d|[1-9])$/.test(day)) {
    return res.status(400).json({ error: 'Invalid day format' });
  }
  
  next();
};

// Routes
app.get('/vehicle-count/daily', validateDateParams, async (req, res) => {
  const { email} = req.query;
  try {
    const result = await fetchLast15DaysVehicleCount(email);
    if (!result) {
      return res.status(404).json({ error: 'No data found for the specified date' });
    }
    console.log('Daily Count Result:', result);
    res.json(result);
  } catch (error) {
    console.error('Daily count error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch daily vehicle count',
      details: error.message 
    });
  }
});

app.get('/vehicle-count/monthly', validateDateParams, async (req, res) => {
  const { email} = req.query;
  try {
    const result = await fetchLast15MonthsVehicleCount(email);
    if (!result) {
      return res.status(404).json({ error: 'No data found for the specified month' });
    }
    res.json(result);
  } catch (error) {
    console.error('Monthly count error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch monthly vehicle count',
      details: error.message 
    });
  }
});

app.get('/vehicle-count/yearly', validateDateParams, async (req, res) => {
  const { email} = req.query;
  try {
    const result = await fetchLast15YearsVehicleCount(email);
    if (!result) {
      return res.status(404).json({ error: 'No data found for the specified year' });
    }
    res.json(result);
  } catch (error) {
    console.error('Yearly count error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch yearly vehicle count',
      details: error.message 
    });
  }
});

// Add the predict route if it's being used
app.use('/predict', predictRoute);
// app.post('/recommend', recommendRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();