import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/get-gold-data', async (req, res) => {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_KEY;
    const url = `https://www.alphavantage.co/query?function=GOLD_SILVER_HISTORY&symbol=GOLD&interval=daily&apikey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch gold data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});