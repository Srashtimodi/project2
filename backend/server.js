const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to categorize array elements
function categorizeData(dataArray) {
  const numbers = [];
  const alphabets = [];
  const special_characters = [];

  dataArray.forEach(item => {
    const itemStr = String(item);
    
    // Check if it's a number
    if (!isNaN(itemStr) && itemStr.trim() !== '') {
      numbers.push(itemStr);
    }
    // Check if it's alphabetic (letters only)
    else if (/^[a-zA-Z]+$/.test(itemStr)) {
      alphabets.push(itemStr);
    }
    // Everything else is a special character
    else {
      special_characters.push(itemStr);
    }
  });

  return { numbers, alphabets, special_characters };
}

app.get('/', (req, res) => {
  res.send('Backend API is running successfully!');
});

// POST endpoint to parse data
app.post('/api/parse', (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        error: 'Invalid input. Please provide a "data" field with an array.'
      });
    }

    // Categorize the data
    const result = categorizeData(data);

    // Send response
    res.json(result);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
