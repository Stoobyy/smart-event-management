const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Event = require("../models/Event");
const Booking = require("../models/Booking");
const { rawUsers, events } = require("../data/seedData");

const router = express.Router();


router.get("/seed", async (req, res) => {
  try {
    await Promise.all([
      Booking.deleteMany({}),
      User.deleteMany({}),
      Event.deleteMany({})
    ]);

    const users = await User.insertMany(
      rawUsers.map(u => ({
        ...u,
        passwordHash: bcrypt.hashSync("password123", 10)
      }))
    );

    const evs = await Event.insertMany(events);

    const selections = [
      { u: users[1]._id, e: evs[0]._id }, 
      { u: users[2]._id, e: evs[1]._id }, 
      { u: users[2]._id, e: evs[0]._id }  
    ];

    for (const s of selections) {
      await Booking.create({ user: s.u, event: s.e });
      const ev = await Event.findById(s.e);
      ev.bookedSeats += 1;
      await ev.save();
    }

    res.json({
      ok: true,
      users: users.length,
      events: evs.length,
      bookings: selections.length,
      note: "Demo passwords = password123"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
