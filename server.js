import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  
  origin: [ 'https://blackcoffer-kappa.vercel.app'], 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Health check endpoint 
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Blackcoffer Dashboard API is running',
    timestamp: new Date().toISOString()
  });
});


app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});


// MongoDB connection function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};


const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
};

startServer();
