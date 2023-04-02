module.exports = () => {
  const findAll = (req, res) => {
    const users = [{ name: "John", age: 20 }];
    res.send(users);
  };

  const create = (req, res) => {
    const user = req.body;
    res.status(201).send(user);
  };

  return { findAll, create };
};
