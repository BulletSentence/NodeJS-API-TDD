const app = require("express")();
const consign = require("consign");
const knex = require("knex");
const knexfile = require("../knexfile");

// Cria o chaveamento dinamico
app.db = knex(knexfile.test);

consign({ cwd: "src", verbose: false })
  .include("./config/middlewares.js")
  .then("./routes")
  .then("./config/routes.js")
  .into(app);

app.get("/", (req, res) => {
  res.send("Hello World!").sendStatus(200);
});

app.db.on("query", (query) => {
  console.log(query.sql);
  console.log(query.bindings);
}).on("error", (err) =>
  console.log(err)
);

module.exports = app;
