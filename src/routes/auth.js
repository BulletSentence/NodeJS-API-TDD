const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");

require('dotenv').config();

module.exports = (app) => {
  const signin = (req, res, next) => {
    app.services.user
      .findbyEmail(req.body.mail)
      .then((user) => {
        if (!user) return res.status(400).json({ error: "User not found" });
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.mail,
          }
          const token = jwt.encode(payload, process.env.AUTH_SECRET);
          res.status(200).json({ token });
        } else {
          return res.status(400).json({ error: "Invalid Password" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ error: err.message, payload: req.body });
      });
  };
  const helloworld = (req, res, next) => {
    res.status(200).send("Hello World!");
  };

  return { signin, helloworld};

};
