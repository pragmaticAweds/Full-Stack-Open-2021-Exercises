const morgan = require("morgan");
const logger = require("./logger");

morgan.token("body", (req, res) => JSON.stringify(req.body));

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);

const unknownEndpoint = (req, res) =>
  res.status(404).send({ error: "unknown endpoint" });

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  console.log("error handler working");

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(errorHandler);
};

module.exports = {
  morganMiddleware,
  unknownEndpoint,
  errorHandler,
};
