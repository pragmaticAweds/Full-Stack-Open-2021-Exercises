const { Schema, Model, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3 },
  favoriteGenre: { type: String, required: true },
});

module.exports = model("User", userSchema);
