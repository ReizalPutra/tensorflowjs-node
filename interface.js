import * as tf from '@tensorflow/tfjs-node';
import path from 'path';

async function loadModel() {
    try {
        const modelUrl = 'file://model/model.json';
        const model = await tf.loadLayersModel(modelUrl);
        console.log('Model loaded successfully');
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

async function predict(model, imageBuffer) {
    const tensor = tf.node
        .decodeImage(imageBuffer, 3) // Decode image to RGB tensor
        .resizeNearestNeighbor([150, 150])
        .expandDims()
        .toFloat()
        .div(255.0); // Normalize to [0, 1] range

    const prediction = model.predict(tensor);
    return await prediction.data(); // Return prediction as an array
}

export { loadModel, predict };
