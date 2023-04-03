module.exports = (app) => {
    const findAll = (req, res) => {
        return app.db("users").select();
    };

    const save = (user) => {
        return app.db("users").insert(user, "*");
    };

    return { findAll, save };
}
