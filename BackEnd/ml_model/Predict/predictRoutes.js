// import { runPrediction } from '../Predict/prediction.js'; // ✅ Ensure to include .js extension

// async function predictRoute(req, res) {
//   try {
//     const { input1: month, input2: year } = req.body;

//     // ✅ Validate input presence before parsing
//     if (month === undefined || year === undefined) {
//       return res.status(400).json({ error: 'Month and year are required' });
//     }

//     const monthNum = parseInt(month);
//     if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
//       return res.status(400).json({ error: 'Month must be between 1 and 12' });
//     }

//     const yearNum = parseInt(year);
//     if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
//       return res.status(400).json({ error: 'Year must be between 1900 and 2100' });
//     }

//     const prediction = await runPrediction(monthNum, yearNum);
//     res.json({ prediction: Number(prediction) });
//   } catch (error) {
//     console.error('Error in /predict:', error.message, error.stack);
//     res.status(500).json({ error: 'Prediction failed', details: error.message });
//   }
// }

// // ✅ Correct export for ES Modules
// export { predictRoute };


import { runPrediction } from '../Predict/prediction.js'; // Adjust path if needed

async function predictRoute(req, res) {
  try {
    const { input1: month, input2: year } = req.body;

    // Validate input presence
    if (month === undefined || year === undefined) {
      return res.status(400).json({ error: 'Month and year are required' });
    }

    // Parse and validate inputs
    const monthNum = parseInt(month);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ error: 'Month must be between 1 and 12' });
    }

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
      return res.status(400).json({ error: 'Year must be between 1900 and 2100' });
    }

    const prediction = await runPrediction(monthNum, yearNum);
    res.json({ prediction: Number(prediction) });
  } catch (error) {
    console.error('Error in /predict:', error.message, error.stack);
    res.status(500).json({ error: 'Prediction failed', details: error.message });
  }
}

export { predictRoute };