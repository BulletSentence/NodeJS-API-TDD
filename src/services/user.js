module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db("users").where(filter).select();
    };

    const save = async (user) => {
        if (!user.name) return { error: "Name is a required attribute" };
        if (!user.mail) return { error: "Email is a required attribute" };
        if (!user.password) return { error: "Password is a required attribute" };
        if (user.mail.indexOf("@") === -1) return { error: "Invalid email" };

        const userdb = await findAll({ mail: user.mail });
        if (userdb && userdb.length > 0) return { error: "Email already registered" };

        return app.db("users").insert(user, "*");
    };

    return { findAll, save };
}
