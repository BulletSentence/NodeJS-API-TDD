module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.user.findAll()
    .then((users) => {
        res.status(200).json(users);
      })
  };

  const create = async (req, res) => {
    const user = req.body;
    const result = await app.services.user.save(user);
    if(result.error) return res.status(400).json(result);
    res.status(201).send(result[0]);
  };

  return { findAll, create };
};
