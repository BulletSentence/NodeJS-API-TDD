const app = require("express")();

app.get("/", (req, res) => {
    res.send("Hello World!").sendStatus(200);
    }
);

module.exports = app;