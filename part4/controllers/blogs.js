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
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", (req, res, next) => {
  const blog = { ...req.body, likes: req.body.likes };

  // const blog = {
  //   likes: body.likes,
  // };

  try {
    Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    }).then((update) => res.json(update));
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
