import { Router } from "express";
import { getDiagnoses } from "../services/diagnosesService";

const router = Router();

router.get("/", async (_req, res) => {
  await res.send(getDiagnoses());
});

export default router;
