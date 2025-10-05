const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const Booking = require("../models/Booking");
const { verifyToken, requireAdmin } = require("../middlewear/auth");

const router = express.Router();

// GET /api/admin/analytics/overview
router.get("/overview", verifyToken, requireAdmin, async (_req, res) => {
  try {
    const [totals, byType, byMonth, byCity] = await Promise.all([
      (async () => {
        const [bookAgg] = await Booking.aggregate([
          { $match: { status: "CONFIRMED" } },
          { $group: { _id: null, bookings: { $sum: 1 }, seats: { $sum: "$seats" } } }
        ]);
        const users = await User.countDocuments();
        const events = await Event.countDocuments();
        return {
          totalUsers: users,
          totalEvents: events,
          totalBookings: bookAgg?.bookings || 0,
          seatsBooked: bookAgg?.seats || 0
        };
      })(),
      Event.aggregate([
        {
          $group: {
            _id: "$type",
            events: { $sum: 1 },
            totalSeats: { $sum: "$totalSeats" },
            bookedSeats: { $sum: "$bookedSeats" }
          }
        },
        { $project: { _id: 0, type: "$_id", events: 1, totalSeats: 1, bookedSeats: 1 } },
        { $sort: { type: 1 } }
      ]),
      Booking.aggregate([
        { $match: { status: "CONFIRMED" } },
        {
          $group: {
            _id: { y: { $year: "$createdAt" }, m: { $month: "$createdAt" } },
            seats: { $sum: "$seats" }
          }
        },
        { $sort: { "_id.y": 1, "_id.m": 1 } }
      ]),
      Event.aggregate([
        {
          $group: {
            _id: "$city",
            bookedSeats: { $sum: "$bookedSeats" },
            totalSeats: { $sum: "$totalSeats" }
          }
        },
        { $project: { _id: 0, city: "$_id", bookedSeats: 1, totalSeats: 1 } },
        { $sort: { bookedSeats: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.json({
      totals,
      byType,
      byMonth: byMonth.map(x => ({
        year: x._id.y,
        month: x._id.m,    // 1-12
        seats: x.seats
      })),
      byCity
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Analytics error" });
  }
});

module.exports = router;
