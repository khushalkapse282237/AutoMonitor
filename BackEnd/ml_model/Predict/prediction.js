// import ort from 'onnxruntime-node';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// // ✅ Fix for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// async function runPrediction(month, year) {
//   try {
//     const modelPath = path.join(__dirname, 'P_model.onnx');

//     console.log('Loading model from:', modelPath); // Debug log
//     const session = await ort.InferenceSession.create(modelPath);

//     // ✅ Check available input names
//     console.log('Available input names:', session.inputNames);

//     const inputName = session.inputNames[0];

//     console.log('Using input name:', inputName); // Debug log

//     // ✅ Ensure input shape matches the ONNX model
//     const inputData = new ort.Tensor('float32', new Float32Array([month, year]), [1, 2]);

//     // ✅ Run inference
//     const results = await session.run({ [inputName]: inputData });

//     // ✅ Check available output names
//     console.log('Available output names:', session.outputNames);

//     const outputKey = session.outputNames[0];
//     const prediction = results[outputKey].data;

//     console.log('Prediction result:', prediction);

//     return Array.isArray(prediction) ? prediction[0] : prediction;
//   } catch (error) {
//     console.error('Error in runPrediction:', error.message, error.stack);
//     throw error;
//   }
// }

// export { runPrediction };

import ort from 'onnxruntime-node';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runPrediction(month, year) {
  try {
    const modelPath = path.join(__dirname, 'P_model.onnx');
    console.log('Loading model from:', modelPath);

    const session = await ort.InferenceSession.create(modelPath);
    console.log('Available input names:', session.inputNames);

    const inputName = session.inputNames[0];
    console.log('Using input name:', inputName);

    // Ensure input shape matches the ONNX model (assuming [1, 2] for month, year)
    const inputData = new ort.Tensor('float32', new Float32Array([month, year]), [1, 2]);

    const results = await session.run({ [inputName]: inputData });
    console.log('Available output names:', session.outputNames);

    const outputKey = session.outputNames[0];
    const prediction = results[outputKey].data;

    console.log('Prediction result:', prediction);
    return Array.isArray(prediction) ? prediction[0] : prediction;
  } catch (error) {
    console.error('Error in runPrediction:', error.message, error.stack);
    throw new Error(`Prediction failed: ${error.message}`);
  }
}

export { runPrediction };