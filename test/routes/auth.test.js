const request = require("supertest");
const app = require("../../src/app");

test("Should receive a token", async () => {
    const mail = `${Date.now()}@mail.com`;
    app.services.user.save({
        name: "Teste",
        mail: mail,
        password: "XXXXXX"
    }).then(() => {
        request(app).post("/auth/signin")
        .send({
            mail: mail,
            password: "XXXXXX"
        }).then((res) => {
            expect(res.status).toBe(200);
            console.log(res.body);
            expect(res.body).toHaveProperty("token");
        });
    });
});
