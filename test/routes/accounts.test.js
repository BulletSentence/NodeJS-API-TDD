const request = require("supertest");
const app = require("../../src/app");

const MAIN_ROUTE = "/accounts";
let user;
var date_now = Date.now();
beforeAll(async () => {
  const res = await app.services.user.save({
    name: "Leonardo",
    mail: date_now + "@gmail.com",
    password: "123456",
  });

  user = { ...res[0] };
});

test("Should insert an account", async () => {
  const res = await request(app)
    .post(MAIN_ROUTE)
    .send({ name: "Acc #1", user_id: user.id });
  expect(res.status).toBe(201);
  expect(res.body.name).toBe("Acc #1");
});

test("Should not insert an account without name", async () => {
  const res = await request(app).post(MAIN_ROUTE).send({ user_id: user.id });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe("Name is a required attribute");
});

test("Should List all accounts", async () => {
  await app.db("accounts").insert({ name: "Acc List", user_id: user.id });
  const res = await request(app).get(MAIN_ROUTE);
  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});

test("Should return a account by id", async () => {
  const acc = await app
    .db("accounts")
    .insert({ name: "Acc by ID", user_id: user.id }, ["id"]);
  const res = await request(app).get(`${MAIN_ROUTE}/${acc[0].id}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe("Acc by ID");
  expect(res.body.user_id).toBe(user.id);
});

test("Should update an account", async () => {
  const acc = await app
    .db("accounts")
    .insert({ name: "Acc to update", user_id: user.id }, ["id"]);
  const res = await request(app)
    .put(`${MAIN_ROUTE}/${acc[0].id}`)
    .send({ name: "Acc Updated" });
  expect(res.status).toBe(200);
});

test("Should remove an account", async () => {
  const acc = await app
    .db("accounts")
    .insert({ name: "Acc to delete", user_id: user.id }, ["id"]);
  const res = await request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`);
  expect(res.status).toBe(204);
});

test.skip("Should not remove an account with transactions", () => {});

test.skip("Should not have accounts with same name", () => {});

test.skip("List only your accounts", () => {});

test.skip("Should not insert an account with user_id different from the token", () => {});
