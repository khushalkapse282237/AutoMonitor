// Your route file (e.g., routes/recommend.js)
import { runRecommendation } from '../Recommend/recommendation.js';

async function recommendRoute(req, res) {
  try {
    const { input1: month, input2: year, input3: salePrice } = req.body;
    console.log('Request body:', req.body);

    const monthNum = parseInt(month);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ error: 'Month must be between 1 and 12' });
    }

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
      return res.status(400).json({ error: 'Year must be between 1900 and 2100' });
    }

    const salePriceNum = parseFloat(salePrice);
    if (isNaN(salePriceNum) || salePriceNum < 0) {
      return res.status(400).json({ error: 'Sale Price must be a positive number' });
    }

    const recommendation = await runRecommendation(monthNum, yearNum, salePriceNum);
    res.json({ recommendation });
  } catch (error) {
    console.error('Error in /recommend:', error.message, error.stack);
    res.status(500).json({ error: 'Recommendation failed', details: error.message });
  }
}

export { recommendRoute };