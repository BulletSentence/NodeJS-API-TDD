const bcypt = require("bcrypt");

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db("users").where(filter).select(["id", "name", "mail"]);
  };

  const findOne = (id) => {
    return app.db("users").where({ id }).first();
  };

  const findbyEmail = (mail) => {
    return app.db("users").where({ mail }).first();
  };

  const getPasswordHash = (password) => {
    const salt = bcypt.genSaltSync(10);
    return bcypt.hashSync(password, salt);
  };

  const save = async (user) => {
    if (!user.name) return { error: "Name is a required attribute" };
    if (!user.mail) return { error: "Email is a required attribute" };
    if (!user.password) return { error: "Password is a required attribute" };

    const userdb = await findAll({ mail: user.mail });

    if (userdb && userdb.length > 0)
      return { error: "Email already registered" };

    var newUser = { ...user };
    newUser.password = getPasswordHash(user.password);
    return await app.db("users").insert(newUser, ["id", "name", "mail"]);
  };

  return { findAll, save, findOne, findbyEmail };
};
