const fs = require("fs")
const crypto = require("crypto")
const path = require("path")


const getHash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash("sha256");
    hashSum.update(fileBuffer);
    return hashSum.digest("hex");
};

const identifyStudent = (req, res) => {
    console.log("Received file:", req.file);
    try {
        const uploadedPath = req.file.path;

        const uploadedHash = getHash(uploadedPath);

        const students = [
            {
                roll_no: "101",
                path: path.join(__dirname, "../stored-images/101.png"),
            },
            {
                roll_no: "102",
                path: path.join(__dirname, "../stored-images/102.png"),
            },
        ];

        for (let student of students) {
            const storedHash = getHash(student.path);
            if (storedHash === uploadedHash) {
                return res.json({ roll_no: student.roll_no });
            }
        }

        return res.json({ message: "No match found" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getData = (req, res) => {
    return res.json({ message: "Data endpoint" });
}

module.exports = { identifyStudent, getData };
