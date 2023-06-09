const request = require("supertest");
const app = require("../../src/app");
const service = require("../../src/services/user");
const jwt = require("jwt-simple");

require('dotenv').config();

const newemail = Date.now() + Math.random(3) + "@gmail.com";
let user;
var date_now = Date.now();

beforeAll(async () => {
  const res = await app.services.user.save({
    name: "Leonardo",
    mail: date_now + "@gmail.com",
    password: "123456",
  });

  user = { ...res[0] };
  user.token = jwt.encode(user, process.env.AUTH_SECRET);
});

test("Should list all users", () => {
  return request(app)
    .get("/users")
    .set("Authorization", `Bearer ${user.token}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
});

test("Should create a new user", () => {
  return request(app)
    .post("/users")
    .set("Authorization", `Bearer ${user.token}`)
    .send({ name: "Leonardo", mail: newemail, password: "123456" })
    .then((response) => {
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).not.toHaveProperty("password");
    });
});

test("Should not create a user with no name", async () => {
  const email = Date.now() + "@gmail.com";
  const response = await request(app)
    .post("/users")
    .send({ mail: email, password: "123456" })
    .set("Authorization", `Bearer ${user.token}`);
  expect(response.body.error).toBe("Name is a required attribute");
});

test("Should not create a user with no email", async () => {
  const result = await request(app)
    .post("/users")
    .send({ name: "Leonardo", password: "123456" })
    .set("Authorization", `Bearer ${user.token}`);
  expect(result.statusCode).toBe(400);
  expect(result.body.error).toBe("Email is a required attribute");
});

test("Should not create a user with no password", async () => {
  const email = Date.now() + "@gmail.com";
  const result = await request(app)
    .post("/users")
    .send({ name: "Leonardo", mail: email })
    .set("Authorization", `Bearer ${user.token}`);
  expect(result.statusCode).toBe(400);
  expect(result.body.error).toBe("Password is a required attribute");
});

test("Should not create a user with a existent email", () => {
  return request(app).post('/users')
  .send({ name: "Leonardo", mail: newemail, password: "123456" })
  .set("Authorization", `Bearer ${user.token}`)
  .then((response) => {
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Email already registered");
  });
});

test("Should save a crypt password", async () => {
  const email = Date.now() + "@gmail.com";
  const res = await request(app).post("/users")
  .send({ name: "Leonardo", mail: email, password: "123456" })
  .set("Authorization", `Bearer ${user.token}`)
  expect(res.statusCode).toBe(201);
  const { id } = res.body;
  const user = await app.db("users").where({ id }).first();
  expect(user.password).not.toBeUndefined();
  expect(user.password).not.toBe("123456");
});
