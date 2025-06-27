// authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
// const sendEmail = require('../utils/sendEmail');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Signup Controller
exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, user: { fullName: user.fullName, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // ✅ Hardcoded admin login (no JWT)
    if (email === "admin123@gmail.com" && password === "11") {
      return res.status(200).json({
        message: 'Admin login successful',
        fullName: 'Admin',
        email: email,
        isAdmin: true,
      });
    }

    // ✅ Normal user login via DB
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'User not found' });

    // 🔐 Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid password' });

    // 🔐 Generate JWT token
    const token = jwt.sign({ id: user._id, fullName: user.fullName, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: 'Login successful',
      fullName: user.fullName,
      email: user.email,
      token,              // 🟢 Include token
      isAdmin: false,
    });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Step 1: Send OTP
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
//     user.newPassword = await bcrypt.hash(newPassword, 10); // temp password

//     await user.save();

//     await sendEmail(email, "Your OTP for Password Reset", `Your OTP is: ${otp}`);
//     res.json({ message: "OTP sent to email" });

//     console.log("OTP Sent:", user.otp);
//     console.log("Expiry:", user.otpExpiry, Date.now());
//   }
//   catch (err) {
//     console.error("Forgot Password Error:", err);
//     res.status(500).json({ message: "Failed to send OTP", error: err.message });
//   }
// };

// Step 2: Verify OTP
// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   const user = await User.findOne({ email });

//   console.log("New Password:", user?.newPassword);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   if (!user.otp || user.otp !== otp || Date.now() > user.otpExpiry) {
//     return res.status(400).json({ message: 'Invalid or expired OTP' });
//   }

//   user.password = user.newPassword;
//   user.otp = null;
//   user.otpExpiry = null;
//   user.newPassword = null;

//   await user.save();
//   return res.json({ message: 'Password updated successfully' });
// };
