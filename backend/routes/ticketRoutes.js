const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Admin = require('../models/Admin')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth"); 

// --- Create a new ticket ---
router.post('/', async (req, res) => {
  try {
    const { name, issue, priority } = req.body;
    const ticket = await Ticket.create({ name, issue, priority });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// --- Get all tickets (with optional filters) ---
router.get('/', async (req, res) => {
  try {
    const { status, priority } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// --- Update ticket status ---
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
   
    if (!admin) return res.status(400).json({ error: "Invalid email or password" });

    const validPass = await bcrypt.compare(password, admin.password);
   
    if (!validPass) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
