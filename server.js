const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Default route to index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
