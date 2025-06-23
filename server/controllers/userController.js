const User = require('../models/User');
const bcrypt = require('bcrypt');

// Admin: Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get profile of the logged-in user
const getUserProfile = async (req, res) => {
  const userId = req.user.id; // Extracted from JWT via auth middleware

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔐 Update profile of the logged-in user
const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { fullName, password } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (fullName) user.fullName = fullName;

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: 'Profile updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile.', error: error.message });
  }
};

// Admin: Delete user by ID
const deleteUser = async (req, res) => {
 
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};