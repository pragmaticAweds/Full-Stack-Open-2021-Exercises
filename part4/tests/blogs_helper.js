const Blog = require("../models/blogmodel");

const blogs = [
  {
    title: "First classs",
    author: "Matti Luukkainen",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    id: "61f7df58c6a099cef5f795bf",
  },
  {
    title: "First classs",
    author: "Matti Luukkainen",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    id: "61f7df5ec6a099cef5f795c5",
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

const blogsInDb = async () => {
  const newBlogs = await Blog.find({});
  return newBlogs.map((blog) => blog.toJSON());
};

module.exports = { blogs, nonExistingLikes, defaultLikes, blogsInDb };
