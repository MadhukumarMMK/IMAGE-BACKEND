const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// --------------------
// Middlewares
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Static Folders
// --------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/stored-images", express.static(path.join(__dirname, "stored-images")));

// --------------------
// Routes
// --------------------
const identifyRoute = require("./routes/identifyRoute");
app.use("/api", identifyRoute);

// --------------------
// Health Check Route
// --------------------
app.get("/", (req, res) => {
    res.send("Image Roll Number API Running...");
});

// --------------------
// Error Handling Middleware
// --------------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

// --------------------
// Create Required Folders If Not Exist
// --------------------
const requiredFolders = ["uploads"];
requiredFolders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
});

// --------------------
// Start Server
// --------------------
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
