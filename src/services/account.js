const ValidationError = require("../errors/ValidationError");

module.exports = (app) => {

  const save = async (account) => {
    if (!account.name) throw new ValidationError("Name is a required attribute");
    return app
      .db("accounts")
      .insert(account, "*")
  };

  const findAll = (filter = {}) => {
    return app.db("accounts").where(filter).select();
  };

  const find = (filter = {}) => {
    return app.db("accounts").where(filter).first();
  };

  const update = (id, account) => {
    return app
      .db("accounts")
      .where({ id })
      .update(account, "*");
  };

  const remove = (id) => {
    return app.db("accounts").where({ id }).del();
  };

  return { save, findAll, find, update, remove };
};
