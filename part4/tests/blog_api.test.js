const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});

test("check unique identifier", async () => {
  const res = await api.get("/api/blogs");

  expect(res.body[0].id).toBeDefined();
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
