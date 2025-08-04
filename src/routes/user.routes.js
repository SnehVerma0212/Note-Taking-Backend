const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, deleteProfile } = require("./../controllers/user.controller");
const authMiddleware = require("./../middlewares/auth.middleware");

router.get('/profile', authMiddleware , getProfile);
router.patch('/profile', authMiddleware , updateProfile);
router.delete('/profile', authMiddleware , deleteProfile);

module.exports = router;