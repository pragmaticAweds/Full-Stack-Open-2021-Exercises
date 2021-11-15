require("dotenv").config();

const mongoUrl = process.env.MONGODB_URI;
const PORT = process.env.port || 3003;

module.exports = {
  mongoUrl,
  PORT,
};
