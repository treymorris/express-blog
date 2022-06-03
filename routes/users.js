const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET user.
router.get("/", userController.get_user);

// Post user sign up.
router.post("/signup", userController.signup);

// POST user login.
router.post("/login", userController.login);

// POST user login.
router.post("/logout", userController.logout);

module.exports = router;
