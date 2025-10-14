const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("Hello Server");
});

const port = 3000;
app.listen(port, (req, res) => {
    console.log("server runnig" + port)
});