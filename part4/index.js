const config = require("./utils/config");
const logger = require("./utils/logger");
const app = require("./app.js");

const port = config.PORT;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// const fetch = async () => {
//   const res = await api.get("/api/blogs");
//   console.log(res.body);
// };

// fetch();
