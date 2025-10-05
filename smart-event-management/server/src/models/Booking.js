const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    seats: { type: Number, default: 1, min: 1 },           // 👈 store seats
    status: { type: String, enum: ["CONFIRMED","CANCELLED"], default: "CONFIRMED" }
  },
  { timestamps: true }
);

// still prevent duplicate docs for same user+event
bookingSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);
