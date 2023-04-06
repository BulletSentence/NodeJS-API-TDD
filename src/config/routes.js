module.exports = (app) => {
  app.route("/users")
  .get(app.routes.user.findAll)
  .post(app.routes.user.create);

  app.route("/accounts")
  .get(app.routes.accounts.getAll)
  .post(app.routes.accounts.create);

  app.route("/accounts/:id")
  .get(app.routes.accounts.getById)
  .put(app.routes.accounts.update)
  .delete(app.routes.accounts.remove);

};
