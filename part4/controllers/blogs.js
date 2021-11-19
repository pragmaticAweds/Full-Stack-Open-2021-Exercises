const blogsRouter = require("express").Router();
const Blog = require("../models/blogmodel");

blogsRouter.get("/", (req, res, next) => {
  Blog.find({})
    .then((blogs) => res.json(blogs))
    .catch((err) => next(err));
});

blogsRouter.post("/", (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => next(err));
});

blogsRouter.delete("/:id", (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then((res) => res.status(204).end())
    .catch((err) => next(err));
});

blogsRouter.put("/:id", (req, res, next) => {
  const blog = new Blog(req.body);

  Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })
    .then((update) => res.json(update))
    .catch((err) => next(err));
});

module.exports = blogsRouter;
