const express = require("express");
const Event = require("../models/Event");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

const router = express.Router();

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.get("/", async (_req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/book/:eventId", verifyToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    const seatsToAdd = Math.max(1, parseInt(req.body.seats ?? 1, 10));

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const available = event.totalSeats - event.bookedSeats;
    if (available < seatsToAdd)
      return res.status(400).json({ message: `Only ${available} seat(s) left` });

    let booking = await Booking.findOne({ user: req.user.id, event: eventId, status: "CONFIRMED" });

    if (booking) {
      booking.seats += seatsToAdd;
      await booking.save();
    } else {
      booking = await Booking.create({
        user: req.user.id,
        event: eventId,
        seats: seatsToAdd
      });
    }

    event.bookedSeats += seatsToAdd;
    await event.save();

    res.json({
      message: "Booking successful",
      booking,
      remainingSeats: event.totalSeats - event.bookedSeats
    });
  } catch (e) {
    if (e?.code === 11000) {
      return res.status(409).json({ message: "You already have a booking for this event" });
    }
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
