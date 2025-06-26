const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const fakeUser = {
  email: "test@example.com",
  passwordHash: bcrypt.hashSync("123456", 10),
};

app.post("/api/auth/login", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (email !== fakeUser.email) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, fakeUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: "user123" }, "mySecretKey", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      user: { email },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Mock login API running on http://localhost:5000");
});
