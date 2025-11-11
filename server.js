const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, JS, images) from subfolders
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// ----------- MANUAL ROUTES FOR EACH HTML PAGE -----------

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Index.html"));
});

// Login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});


// Login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "templates\index.html"));
});
// Signup page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "Sign.html"));
});

// Contact page
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Explore page
app.get("/explore", (req, res) => {
  res.sendFile(path.join(__dirname, "explore.html"));
});

// Interview page
app.get("/interview", (req, res) => {
  res.sendFile(path.join(__dirname, "interview.html"));
});

// Language page
app.get("/language", (req, res) => {
  res.sendFile(path.join(__dirname, "language.html"));
});

// Display page
app.get("/display", (req, res) => {
  res.sendFile(path.join(__dirname, "display.html"));
});

// JS page
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "js.html"));
});

// ---------------------------------------------------------

// 404 fallback (if no page matches)
app.use((req, res) => {
  res.status(404).send("<h1 style='color:lime;text-align:center;'>404 - Page Not Found</h1>");
});

// Start the server (for local testing)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // for Vercel compatibility
