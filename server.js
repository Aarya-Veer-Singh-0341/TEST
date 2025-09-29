const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./users.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    dob TEXT,
    email TEXT
)`);

app.post('/submit', (req, res) => {
    const { name, dob, email } = req.body;
    db.run(
        `INSERT INTO users (name, dob, email) VALUES (?, ?, ?)`,
        [name, dob, email],
        function (err) {
            if (err) {
                return res.status(500).send('Database error');
            }
            res.send('Form submitted successfully!');
        }
    );
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});