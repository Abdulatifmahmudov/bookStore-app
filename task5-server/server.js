const express = require('express');
const cors = require('cors');
const generateBooks = require('./utils/bookGenerator');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.get('/books', (req, res) => {
  const {
    region = 'en_US',
    seed = 'default',
    page = 0,
    likes = 0,
    reviews = 0,
    count = 10,
  } = req.query;

  try {
    const books = generateBooks({
      region,
      seed,
      page: parseInt(page),
      likes: parseFloat(likes),
      reviews: parseFloat(reviews),
      count: parseInt(count),
    });

    res.json({ books });
  } catch (err) {
    console.error('❌ Error generating books:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});
