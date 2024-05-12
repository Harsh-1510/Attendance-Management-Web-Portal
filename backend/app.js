const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");

dotenv.config();

// set up server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

/*----------------------- Routes -----------------------*/

//login
app.post("/auth/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter both, email and password." });

    email = email.toLowerCase();
    if (email !== "admin@edu.in" || password !== "Password@123") {
      return res.status(400).json({ errorMessage: "Unautherized" });
    }

    const token = jwt.sign({ user: email }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//logout
app.get("/auth/logout", (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(500).send("Some Error Occurred");
  }
});

//Checking authentication system
app.get("/auth/loggedIn", async (req, res) => {
  try {
    if (!req.cookies.token) return res.json(false);
    jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    return res.json(true);
  } catch (err) {
    console.log(err);
    return res.json(false);
  }
});

// set up attendence
app.get("/attendence", async (req, res) => {
  try {
    if (!req.cookies.token)
      return res
        .status(401)
        .json({ errorMessage: "Unautherised by no cookie" });
    const verified = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.userId = verified.user;
  } catch (err) {
    console.log(err);
    return res.status(401).json({ errorMessage: "Unautherised" });
  }

  try {
    const attendence = await fetch(
      "https://faceattendencerealtime-e3d59-default-rtdb.firebaseio.com/Students.json"
    );
    const data = await attendence.json();
    res.send(data);
  } catch (err) {
    res.send("Error");
  }
});
