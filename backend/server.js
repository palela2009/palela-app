const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

const phonesRouter = require('./routes/phones');
const laptopsRouter = require('./routes/laptops');

app.use('/api/phones', phonesRouter);
app.use('/api/laptops', laptopsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Palela App Backend API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
