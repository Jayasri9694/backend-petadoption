const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const petRoutes = require('./routes/petRoutes');
dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});
// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://silver-zuccutto-3c24e2.netlify.app'],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,
}));

// Use the applicationRoutes for /api paths
app.use('/api', petRoutes);

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
