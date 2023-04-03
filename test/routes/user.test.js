const request = require("supertest");
const app = require("../../src/app");

test("Should list all users and lenght greater than one", () => {
  return request(app)
    .get("/users")
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(1);
    });
});

 test("Should create a new user", () => {
  const email = Date.now() + "@gmail.com";
  return request(app).post("/users")
    .send({ name: "Leonardo", mail: email, password: "123456" })
    .then((response) => {
      expect(response.statusCode).toBe(201);
    });
});

