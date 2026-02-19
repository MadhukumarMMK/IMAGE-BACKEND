const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { identifyStudent,getData } = require("../controllers/identifyController");

const upload = multer({ dest: "uploads/" });

router.post("/identify", upload.single("image"), identifyStudent);
router.get("/data", getData);

module.exports = router;
