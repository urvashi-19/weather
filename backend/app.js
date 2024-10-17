const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weatherRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
