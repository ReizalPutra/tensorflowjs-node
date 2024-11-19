import express from 'express';
import { loadModel, predict } from './interface.js';
import fs from 'fs';

const app = express();
const port = 3030;

let model;

// Muat model sekali saat server dinyalakan
(async () => {
    model = await loadModel();
    console.log('Model loaded successfully');
})();

// Endpoint untuk prediksi
app.post('/predict', async (req, res) => {
    try {
        // Ambil buffer gambar dari request
        const imageBuffer = fs.readFileSync('./path-to-image.jpg'); // Sesuaikan dengan lokasi gambar

        const predictions = await predict(model, imageBuffer);
        res.json({ predictions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Prediction failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
