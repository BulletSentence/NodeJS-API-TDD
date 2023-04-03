const supertest = require("supertest");
const request = supertest
const app = require("../src/app");

test("shoud answer on /", () => {
  return request(app).get("/").then((response) => {
    expect(response.statusCode).toBe(200);
  });
});

