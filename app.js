const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());

// const userRoutes = require("./routes/userRoutes");
const merchantRoutes = require("./routes/merchantRoute");
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

// app.use("/users", userRoutes);
app.use("/merchants", merchantRoutes);

module.exports = app;
