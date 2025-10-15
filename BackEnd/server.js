//--- SERVER INITIALIZED ----
const express = require("express");
const CORS = require("cors");

//--- DB CONNECTIONS ----
const connections = require("./config/db");

//--- ROUTER'S IMPORT ----
const { authenRouter } = require("./routes/authRouter");
const { sessionRouter } = require("./routes/sessionRouter");

//---- APPLICATION'S ----
const app = express();
const port = 3000;

// MIDDLEWARE
app.use(CORS());
app.use(express.json());

// ROUTER'S
app.use("/api/v0.1/authendication/", authenRouter);
app.use("/session/", sessionRouter);

app.get('/', async (req, res) => {
    try {
        const [rows] = await connections.execute('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});

// START SERVER
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// DB CLOSE
process.on('SIGINT', async () => {
    await connections.end();
    console.log('Close Connections');

    process.exit();
});