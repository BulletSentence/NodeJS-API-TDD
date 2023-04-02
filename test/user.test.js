const request = require("supertest");
const app = require("../src/app");

test("Should list all users", () => {
  return request(app)
    .get("/users")
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty("name", "John");
    });
});

test("Should create a new user", () => {
  return request(app)
    .post("/users")
    .send({ name: "Leonardo", age: 18 })
    .then((response) => {
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("name", "Leonardo");
    });
});
