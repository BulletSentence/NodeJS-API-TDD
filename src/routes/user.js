module.exports = (app) => {
  const findAll = (req, res, next) => {
    app.services.user.findAll()
    .then((users) => {
      res.status(200).json(users);
    }).catch((err => next(err)));
  };

  const create = async (req, res, next) => {
    const user = req.body;
    const result = await app.services.user.save(user);
    try {
      if (result.error) return res.status(400).json(result);
    } catch (msg) {
      return next(msg);
    }
    res.status(201).send(result[0]);
  };

  return { findAll, create };
};
