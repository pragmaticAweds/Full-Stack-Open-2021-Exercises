const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blogmodel");
const app = require("../app");
const api = supertest(app);

const helper = require("../tests/blogs_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.blogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.blogs[1]);
  await blogObject.save();
}, 100000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.blogs.length);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});

test("check unique identifier", async () => {
  const res = await api.get("/api/blogs");

  expect(res.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});

test("verify new blog is posted successfully", async () => {
  const newBlog = {
    title: "Canonical reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const result = await api.get("/api/blogs");
  expect(result.body).toHaveLength(helper.blogs.length + 1);

  const contents = result.body.map((content) => content.title);
  expect(contents).toContain("Canonical reduction");
});

test("finding a specific blog", async () => {
  const localDb = await helper.blogsInDb();
  const localblog = localDb[0];

  const specificId = await api
    .get(`/api/blogs/${localblog.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBLog = JSON.parse(JSON.stringify(localblog));
  expect(specificId.body).toEqual(processedBLog);
});

test("testing delete functionality", async () => {
  const localDb = await helper.blogsInDb();
  const blogToBeDeleted = localDb[0];

  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);

  const lastBlog = await helper.blogsInDb();

  expect(lastBlog).toHaveLength(helper.blogs.length - 1);

  const title = lastBlog.map((blog) => blog.title);

  expect(title).not.toContain(blogToBeDeleted.title);
});

test("check if an obj has zero", async () => {
  const newBlog = {
    title: "Canonical reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };
  const likes = helper.defaultLikes(newBlog);
  expect(likes).toHaveProperty("likes");
});

test("missing data", async () => {
  const newBlog = {
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 0,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});
