const mongoose = require('mongoose');

async function connectDB() {
  try {
    console.log('Connecting to:', process.env.MONGO_URI);

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected:', conn.connection.host);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;

