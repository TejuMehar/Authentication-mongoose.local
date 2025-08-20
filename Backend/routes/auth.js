const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, age, username, mobile, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      age,
      username,
      mobile,
      email,
      password: hashedPassword,
    });

    // ✅ Send JSON response instead of redirect
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Login (Username + Password only)
router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      req.logIn(user, (err) => {
        if (err) return next(err);

        console.log("User logged in:", user.name);
        return res.json({
          success: true,
          redirect: "https://www.linkedin.com/in/tejas-mehar/"
        });
      });
    })(req, res, next);
  }
);


// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
});

module.exports = router;
