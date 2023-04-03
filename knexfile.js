module.exports = {
  test: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "postgres",
      database: "postgres",
    },
    migrations: {
      directory: "./src/migrations",
    },
  },
};
