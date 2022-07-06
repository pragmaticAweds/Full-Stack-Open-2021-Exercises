import { error } from "console";
import { Router } from "express";
import {
  addPatient,
  nonSensitivePatientsDataEntries,
  singleUser,
} from "../services/patientsService";
import toNewPatientEntry from "../utils/inputValidator";

const router = Router();

router.get("/", async (_req, res) => {
  res.send(nonSensitivePatientsDataEntries());
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = singleUser(id);
    if (data === undefined) {
      throw error(undefined);
    }
    res.send(data);
  } catch (err: unknown) {
    let error = "Wrong Credentials";
    res.status(400).send(error);
  }
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

router.post("/:id/entries", async (req, res) => {
  try {
    const id = req.params.id;
    res.json(id);
  } catch (err: unknown) {}
});
export default router;
