//--- SERVER INITIALIZED ----
const express = require("express");
const CORS = require("cors");

//--- DB CONNECTIONS ----
const connections = require("./config/db");

//--- ROUTER'S IMPORT ----
const { authenRouter } = require("./routes/authRouter");
const { sessionRouter } = require("./routes/sessionRouter");
const { ingestsProduct } = require("./routes/ProductIngests");
const { segmentsRouter } = require("./routes/SegmentsRouter");

//---- APPLICATION'S ----
const app = express();
const port = 3000;

const allowedOrigins = [
    "https://woo-commerce-project.web.app"
];

// MIDDLEWARE
app.use(CORS({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express.json());

// ROUTER'S
app.use("/api/v0.1/authendication", authenRouter);
app.use("/api/v0.1/session", sessionRouter);
app.use("/api/v0.1//ingests", ingestsProduct);
app.use("/api/v0.1/segments", segmentsRouter);

app.get('/', async (req, res) => {
    res.send("Hello, welcome to Woo Commerce.")
});

// PRODUCT DATA'S
app.get('/api/v0.1/products', async (req, res) => {
    try {
        const [productDatas] = await connections.execute('SELECT * FROM products');

        return res.json(productDatas);

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
});

// START SERVER
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${port}`);
});

// DB CLOSE
process.on('SIGINT', async () => {
    await connections.end();
    console.log('Close Connections');

    process.exit();
});