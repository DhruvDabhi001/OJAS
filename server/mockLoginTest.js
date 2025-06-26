const express = require("express");
const app = express();

app.use(express.json());

// ROOT - Test if server is running
app.get("/", (req, res) => {
  res.json({ message: "✅ SERVER IS WORKING!" });
});

// SIMPLE GET - Test basic routing
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from API!" });
});

// SIMPLE POST - Test POST requests
app.post("/test", (req, res) => {
  res.json({ 
    message: "POST request successful!",
    received: req.body 
  });
});

// LOGIN ROUTE - Your actual login test
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  if (email === "test@test.com" && password === "123") {
    res.json({ 
      success: true, 
      message: "Login successful!",
      user: email 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: "Invalid credentials" 
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log("\n📋 TEST THESE ROUTES IN POSTMAN:");
  console.log("GET  http://localhost:3000/");
  console.log("GET  http://localhost:3000/hello");
  console.log("POST http://localhost:3000/test");
  console.log("POST http://localhost:3000/login");
  console.log("\n✅ If all work, your API is fine!");
});

// ----------------------------------------------------------------------------------------
// 1. GET Root (Should work first)

// Method: GET
// URL: http://localhost:3000/
// Expected: {"message": "✅ SERVER IS WORKING!"}

// 2. GET Hello (Test basic routing)

// Method: GET
// URL: http://localhost:3000/hello
// Expected: {"message": "Hello from API!"}

// 3. POST Test (Test POST with body)

// Method: POST
// URL: http://localhost:3000/test
// Headers: Content-Type: application/json
// Body: {"name": "test"}
// Expected: {"message": "POST request successful!", "received": {"name": "test"}}

// 4. POST Login (Your actual login)

// Method: POST
// URL: http://localhost:3000/login
// Headers: Content-Type: application/json
// Body: {"email": "test@test.com", "password": "123"}
// Expected: {"success": true, "message": "Login successful!", "user": "test@test.com"}