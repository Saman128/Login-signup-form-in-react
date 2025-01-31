const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydatabase",
    port: 3307,
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected...");
});
// Login Endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Query to check user credentials
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ message: "Internal Server Error" });
        } else if (results.length > 0) {
            res.status(200).json({ message: "Login successful", user: results[0] });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    });
});
// API endpoint to insert data
app.post("/Signup", (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO users (name, email,password) VALUES (?,?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving data");
        }
        res.send("Data saved successfully!");
    });
});

const PORT = 8083;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
