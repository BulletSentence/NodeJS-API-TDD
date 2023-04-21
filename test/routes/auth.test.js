const request = require("supertest");
const app = require("../../src/app");

test("Should create a user on signup", () => {
  return request(app)
    .post("/auth/signup")
    .send({
      name: "Leo Almeida",
      mail: `${Date.now()}@mail.com`,
      password: "XXXXXX",
    }).then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Leo Almeida");
      expect(res.body).toHaveProperty("mail");
    });
});

test("Should receive a token", async () => {
  const mail = `${Date.now()}@mail.com`;
  app.services.user
    .save({
      name: "Teste",
      mail: mail,
      password: "XXXXXX",
    })
    .then(() => {
      request(app)
        .post("/auth/signin")
        .send({
          mail: mail,
          password: "XXXXXX",
        })
        .then((res) => {
          expect(res.status).toBe(200);
          console.log(res.body);
          expect(res.body).toHaveProperty("token");
        });
    });
});

test("Should not auth with a invalid password", async () => {
  const mail = `${Date.now()}@mail.com`;
  app.services.user
    .save({
      name: "Teste",
      mail: mail,
      password: "XXXXXX",
    })
    .then(() => {
      request(app)
        .post("/auth/signin")
        .send({
          mail: mail,
          password: "XXXXX1X",
        })
        .then((res) => {
          expect(res.body.error).toBe("Invalid Password");
        });
    });
});

test("Should not auth a user that not exists", async () => {
  request(app)
    .post("/auth/signin")
    .send({
      mail: "testester@gmail.com",
      password: "XXXXX1X",
    })
    .then((res) => {
      expect(res.body.error).toBe("User not found");
    });
});

test("Should not access a private route without token", async () => {
  request(app)
    .get("/users")
    .then((res) => {
      expect(res.status).toBe(401);
    });
});
