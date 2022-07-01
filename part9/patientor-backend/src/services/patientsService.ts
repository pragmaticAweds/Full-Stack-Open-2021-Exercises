import patientsEntries from "../../data/patients.json";
import { patientType, PublicPatient, newPatientEntry } from "../utils/type";
import { v1 as uuid } from "uuid";

const patientsData: Array<patientType> = patientsEntries as Array<patientType>;

const patientsDataEntries = (): Array<patientType> => patientsData;

const nonSensitivePatientsDataEntries = (): PublicPatient[] =>
  patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
const id = uuid();

const addPatient = (entry: newPatientEntry): newPatientEntry => {
  const newEntry = {
    id,
    entries: [],
    ...entry,
  };

  patientsEntries.push(newEntry);

  return newEntry;
};

const singleUser = (id: string): PublicPatient | undefined => {
  const patient = patientsData.find((patient) => patient.id === id);
  return patient;
};

export {
  patientsDataEntries,
  nonSensitivePatientsDataEntries,
  addPatient,
  singleUser,
};
