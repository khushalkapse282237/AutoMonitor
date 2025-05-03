// Recommend/recommendation.js
import * as ort from 'onnxruntime-node';

async function runRecommendation(month, year, salePrice) {
  try {
    const modelPath = 'D:\\BE_WEB\\autoMonitor2025\\BackEnd\\ml_model\\Recommend\\mm.onnx';
    console.log('Loading model from:', modelPath);

    // Create session
    const session = await ort.InferenceSession.create(modelPath);
    console.log('Session created successfully');
    console.log('Model input names:', session.inputNames);
    console.log('Model output names:', session.outputNames);

    // Convert inputs to appropriate types
    const monthInt32 = parseInt(month);
    const yearInt32 = parseInt(year);
    const salePriceFloat = parseFloat(salePrice);
    console.log('Parsed inputs:', { monthInt32, yearInt32, salePriceFloat });

    // Create tensor
    const inputData = new Float32Array([monthInt32, yearInt32, salePriceFloat]);
    const tensor = new ort.Tensor('float32', inputData, [1, 3]);
    console.log('Tensor created:', {
      type: tensor.type,
      shape: tensor.dims,
      data: Array.from(tensor.data)
    });

    // Verify tensor is an instance of ort.Tensor
    console.log('Is tensor an ort.Tensor?', tensor instanceof ort.Tensor);

    // Run the model
    const feeds = { [session.inputNames[0]]: tensor };
    console.log('Feeds prepared:', Object.keys(feeds));
    const results = await session.run(feeds);
    console.log('Model output:', results);

    // Return the prediction
    return results[session.outputNames[0]].data[0];
  } catch (error) {
    console.error('Full error details:', error);
    throw new Error(`Recommendation model error: ${error.message}`);
  }
}

export { runRecommendation };