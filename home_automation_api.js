const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Initialize home automation system
let lights = { living_room: false, bedroom: false, kitchen: false };

// Parse JSON request body
app.use(bodyParser.json());

// Endpoint to turn on/off lights
app.post("/api/lights/:room", (req, res) => {
    const room = req.params.room;
    if (room in lights) {
        if (req.body.state !== undefined) {
            lights[room] = req.body.state;
            res.send({
                status: "success",
                message: `${room} lights turned ${lights[room] ? "on" : "off"}`,
            });
        } else {
            res
                .status(400)
                .send({ status: "error", message: "state parameter missing" });
        }
    } else {
        res.status(404).send({ status: "error", message: "invalid room" });
    }
});

// Endpoint to get the state of all lights
app.get("/api/lights", (req, res) => {
    res.send(lights);
});

// Start server
app.listen(3000, () => {
    console.log("Home Automation API listening on port 3000!");
});