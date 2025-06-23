const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getAllUsers, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/auth'); // JWT middleware

router.get('/me', auth, getUserProfile);                  // update profile get email
router.put('/update', auth, updateUserProfile);           // update profile send new data
router.get('/users', getAllUsers);   // admin side get user
router.delete('/:id', deleteUser);   // admin side delete user
module.exports = router;