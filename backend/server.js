const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); // For API requests
const app = express();
const port = 5000;

let requestCount = 0; // Counter for API requests

// Middleware to track requests
app.use((req, res, next) => {
  if (req.path.startsWith('/api/forex')) { // Track only relevant API paths
    requestCount++;
    console.log(`API Request Count: ${requestCount}`);
  }
  next();
});

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:Arthhurlee02@forexcluster.u7spo.mongodb.net/ForexCluster?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Forex Schema
const forexSchema = new mongoose.Schema({
  from_currency: String,
  to_currency: String,
  exchange_rate: Number,
  last_refreshed: String,
  time_zone: String,
});

// Forex Model
const Forex = mongoose.model('Forex', forexSchema);

// Alpha Vantage API Key
const API_KEY = 'Z23Z8M3I6A1J91YZ';

// Fetch Forex Signal (from Alpha Vantage API)
app.get('/api/forex', async (req, res) => {
  const { from_currency, to_currency } = req.query; // Example: ?from_currency=USD&to_currency=EUR

  if (!from_currency || !to_currency) {
    return res.status(400).json({ message: 'Please provide from_currency and to_currency!' });
  }

  try {
    // Call Alpha Vantage API
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency,
        to_currency,
        apikey: API_KEY,
      },
    });

    const data = response.data['Realtime Currency Exchange Rate'];

    if (!data) {
      return res.status(404).json({ message: 'No exchange rate data found!' });
    }

    // Save to MongoDB
    const forex = new Forex({
      from_currency: data['1. From_Currency Code'],
      to_currency: data['3. To_Currency Code'],
      exchange_rate: parseFloat(data['5. Exchange Rate']),
      last_refreshed: data['6. Last Refreshed'],
      time_zone: data['7. Time Zone'],
    });

    const savedForex = await forex.save();

    // Count total documents (API requests stored in MongoDB)
    const totalRequests = await Forex.countDocuments();

    // Return response to client with the count
    res.status(201).json({
      savedForex,
      totalRequests,
    });
  } catch (error) {
    console.error('Error fetching forex data:', error);
    res.status(500).json({ message: 'Failed to fetch forex data' });
  }
});

// Fetch All Forex Data (from MongoDB)
app.get('/api/forex/all', async (req, res) => {
  try {
    const forexData = await Forex.find();
    res.json(forexData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Default Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
