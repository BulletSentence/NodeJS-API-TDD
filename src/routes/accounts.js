module.exports = (app) => {
  const create = (req, res, next) => {
    app.services.account.save(req.body)
    .then((result) => {
      res.status(201).json(result[0]);
    }).catch((err => next(err)));
  };

  const getAll = (req, res, next) => {
    app.services.account.findAll()
    .then((result) => res.status(200).json(result)
    ).catch((err => next(err)));
  };

  const getById = (req, res, next) => {
    app.services.account.find({ id: req.params.id }).then((result) => {
      res.status(200).json(result);
    }).catch((err => next(err)));
  };

  const update = (req, res, next) => {
    app.services.account.update(req.params.id, req.body).then((result) => {
      res.status(200).json(result);
    }).catch((err => next(err)));
  };

  const remove = (req, res, next) => {
    app.services.account.remove(req.params.id).then((result) => {
      res.status(204).json(result);
    }).catch((err => next(err)));
  }

  return { create, getAll, getById, update, remove };
};
