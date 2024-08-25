const router = require("express").Router();
const path = require("path");
const fs = require("fs");

// Function to generate unique IDs
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 9);
}

// HTML Routes
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API Routes
router.get("/api/notes", (req, res) => {
  fs.readFile("../Develop/db/db.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes" });
    }
    res.json(JSON.parse(data));
  });
});

router.post("/api/notes", (req, res) => {
  const newNote = { id: generateUniqueId(), ...req.body };

  fs.readFile("../Develop/db/db.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes" });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(
      "../Develop/db/db.json",
      JSON.stringify(notes, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to save note" });
        }
        res.json(newNote);
      }
    );
  });
});

module.exports = router;
