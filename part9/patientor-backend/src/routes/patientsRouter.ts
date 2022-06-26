import { Router } from "express";
import { nonSensitivePatientsDataEntries } from "../services/patientsService";

const router = Router();

router.get("/", async (_req, res) => {
  res.send(nonSensitivePatientsDataEntries());
});

export default router;
