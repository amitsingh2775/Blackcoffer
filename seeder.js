import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Insight from './models/Insight.js';

// Load env vars
dotenv.config();

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Read JSON file
let insights;
try {
  const jsonData = fs.readFileSync('./jsondata.json', 'utf-8');
  insights = JSON.parse(jsonData);
} catch (error) {
  console.error(`Error reading jsondata.json: ${error.message}`);
  process.exit(1);
}


// Import data into DB
const importData = async () => {
  try {
    await Insight.deleteMany(); 
    await Insight.insertMany(insights);
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during data import: ${error.message}`);
    process.exit(1);
  }
};

// Destroy data from DB
const destroyData = async () => {
  try {
    await Insight.deleteMany();
    console.log(' Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during data destruction: ${error.message}`);
    process.exit(1);
  }
};

// Command-line argument logic
const run = async () => {
  await connectDB();

  if (process.argv[2] === '-i') {
    await importData();
  } else if (process.argv[2] === '-d') {
    await destroyData();
  } else {
    console.log('Please use -i to import data or -d to destroy data.');
    process.exit();
  }
};

run();