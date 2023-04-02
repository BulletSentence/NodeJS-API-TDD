const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!").sendStatus(200);
});

app.get("/users", (req, res) => {
    const users = [
        { name: "John", age: 20 },
    ];
    res.send(users);
});

app.post("/users", (req, res) => {
    const user = req.body;
    res.status(201).send(user);
  });

module.exports = app;
