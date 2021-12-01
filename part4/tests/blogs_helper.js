const Blog = require("../models/blogmodel");

const blogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
];

const defaultLikes = (obj) =>
  !obj.hasOwnProperty("likes") ? { ...obj, likes: 0 } : obj;

const nonExistingLikes = async () => {
  const receivedBlogs = await Blog.find({});
  return receivedBlogs.map((blog) => {
    if (!blog.hasOwnProperty("likes")) return { ...blog, likes: 0 };
    return blog.toJSON();
  });
};

module.exports = { blogs, nonExistingLikes, defaultLikes };
