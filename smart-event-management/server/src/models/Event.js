const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["Workshop","Seminar","Hackathon","Cultural"], required: true },
    description: String,
    date: { type: Date, required: true },
    startTime: String,
    endTime: String,
    venue: String,
    city: String,
    totalSeats: { type: Number, default: 50 },
    bookedSeats: { type: Number, default: 0 },
    imageUrl: String,
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
