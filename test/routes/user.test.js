const request = require("supertest");
const app = require("../../src/app");
const { knex } = require("../../knexfile");

test("Should list all users", () => {
  return request(app)
    .get("/users")
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
});

test("Should create a new user", () => {
  const email = Date.now() + "@gmail.com";
  return request(app)
    .post("/users")
    .send({ name: "Leonardo", mail: email, password: "123456" })
    .then((response) => {
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
    });
});

test("Should not create a user with no name", () => {
  const email = Date.now() + "@gmail.com";
  return request(app).post('/users')
  .send({ mail: email , password: "123456" })
  .then((response) => {
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Name is a required attribute');
  });
});
