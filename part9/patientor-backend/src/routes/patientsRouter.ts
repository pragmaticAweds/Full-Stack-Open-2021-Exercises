import { Router } from "express";
import {
  addPatient,
  nonSensitivePatientsDataEntries,
} from "../services/patientsService";
import toNewPatientEntry from "../utils/inputValidator";

const router = Router();

router.get("/", async (_req, res) => {
  res.send(nonSensitivePatientsDataEntries());
});

router.post("/", async (req, res) => {
  const newEntry = toNewPatientEntry(req.body);
  try {
    const validEntry = addPatient(newEntry);
    res.json(validEntry);
  } catch (error: unknown) {
    let err = "Something went Wrong";
    if (error instanceof Error) {
      err += " Error: " + error.message;
    }
    res.status(400).send(err);
  }
});
export default router;
