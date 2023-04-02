const app = require("express")();
const consign = require("consign");

consign({ cwd: "src", verbose: false })
  .include("./config/middlewares.js")
  .then("./routes")
  .then("./config/routes.js")
  .into(app);

app.get("/", (req, res) => {
  res.send("Hello World!").sendStatus(200);
});

module.exports = app;
