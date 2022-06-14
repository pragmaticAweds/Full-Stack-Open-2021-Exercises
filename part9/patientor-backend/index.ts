import express from "express";

const app = express();

app.get("/ping", async (_req, res) => {
  res.send("pong");
});

app.listen(3001, () => console.log("connected successfully"));
