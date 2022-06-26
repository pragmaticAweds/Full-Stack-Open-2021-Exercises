import express from "express";
import diagnosesRouter from "./routes/diagnosesRouter";
import patientsRouter from "./routes/patientsRouter";

const app = express();

app.get("/ping", async (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(3001, () => console.log("connected successfully"));
