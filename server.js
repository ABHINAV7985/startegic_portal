const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, JS, images) from the current folder
app.use(express.static(path.join(__dirname)));

// Optional: serve CSS/JS/images from subfolders if needed
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Default route for the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
