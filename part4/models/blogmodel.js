const config = require("../utils/config");
const mongoose = require("mongoose");
const logger = require("../utils/logger");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, required: true },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

mongoose
  .connect(config.mongoUrl)
  .then(() => logger.info("Mongoose connected successfully"))
  .catch((err) => logger.error("Mongoose is not connected", err));

module.exports = mongoose.model("Blog", blogSchema);
