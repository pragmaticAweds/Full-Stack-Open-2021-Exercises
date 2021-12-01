require("express-async-errors");
const blogsRouter = require("express").Router();
const Blog = require("../models/blogmodel");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog ? res.json(blog) : res.status(404).end();
});

blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);

  if (!blog.title && !blog.author) {
    return res.status(400).end();
  } else {
    const savedBlog = await blog.save();
    return res.status(201).json(savedBlog);
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  const deleted = await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = new Blog(req.body);

  const updated = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(update);
});

module.exports = blogsRouter;
