const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role });
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
