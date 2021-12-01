const config = require("./utils/config");
const logger = require("./utils/logger");
const app = require("./app.js");

const port = config.PORT;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// const newobj = [
//   {
//     ada: "moyak",

//     likes: 10,
//   },
//   {
//     ada: "myak",

//     // likes: 12,
//   },
//   {
//     ada: "moak",

//     likes: 10,
//   },
//   {
//     ada: "moyak",
//     likes: 3,
//   },
// ];

// const objmap = newobj.map((obj) => {
//   if (obj.likes === undefined) return { ...obj, likes: 0 };

//   return obj;
// });

// console.log(objmap);

// const defaultLikes = (obj) =>
//   !obj.hasOwnProperty("likes") ? { ...obj, likes: 0 } : obj;

// const newLikes = {
//   ada: "moyak",
//   likes: 6,
// };

// console.log(defaultLikes(newLikes));
