module.exports = (app) => {
  const findAll = (req, res) => {
    app.db("users").select()
    .then((users) => {
        res.status(200).json(users);
      })
  };

  const create = async (req, res) => {
    const user = req.body;
    const result = await app.db("users").insert(user, "*")
    res.status(201).send(result[0]);
  };

  return { findAll, create };
};
