const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');



dotenv.config();
connectDB();

const app = express();
app.get('/', (req, res) => {
    res.send('Welcome to the Pet Adoption Platform API');
  });
  
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173','https://silver-zuccutto-3c24e2.netlify.app'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  }));
// Public routes
app.use('/api/pets', petRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use("/api", petRoutes); 
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
