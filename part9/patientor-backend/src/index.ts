import express from "express";
import diagnosesRouter from "./routes/diagnosesRouter";
import patientsRouter from "./routes/patientsRouter";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/ping", async (_req, res) => {
  await res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(3001, () => console.log("connected successfully"));
