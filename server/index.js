const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");
const devRoutes = require("./src/routes/devRoutes");
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes.js");
const analyticsRoutes = require("./src/routes/analyticsRoutes.js");



dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/", (_, res) => res.send("Smart Events API running"));
app.use("/api/dev", devRoutes);   
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin/analytics", analyticsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
