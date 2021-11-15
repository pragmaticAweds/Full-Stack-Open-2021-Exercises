const http = require("http");
const express = require("express");
const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");
const cors = require("cors");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

console.log(config);

const Blog = mongoose.model("Blog", blogSchema);

mongoose.connect(config.mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs));
});

app.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

const port = config.PORT;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
