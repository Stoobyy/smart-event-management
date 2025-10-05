const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, { autoIndex: true });
  console.log("✅ MongoDB connected");
}

module.exports = { connectDB };
