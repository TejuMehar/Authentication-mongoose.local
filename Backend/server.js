const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ===== Middleware =====
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Session Setup =====
app.use(
  session({
    secret: "secretkey", // change this to a strong secret in production
    resave: false,
    saveUninitialized: false,
  })
);

// ===== Passport Config =====
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===== Routes =====
app.use("/auth", require("./routes/auth"));

// ===== Server Start =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
