import patientsEntries from "../../data/patients.json";
import {
  patientType,
  nonSensitivePatientsDataType,
  newPatientEntry,
} from "../utils/type";
import { v1 as uuid } from "uuid";

const patientsData: Array<patientType> = patientsEntries as Array<patientType>;

const patientsDataEntries = (): Array<patientType> => patientsData;

const nonSensitivePatientsDataEntries = (): nonSensitivePatientsDataType[] =>
  patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
const id = uuid();

const addPatient = (entry: newPatientEntry): patientType => {
  const newEntry = {
    id,
    ...entry,
  };

  console.log({ newEntry });

  patientsEntries.push(newEntry);

  return newEntry;
};

export { patientsDataEntries, nonSensitivePatientsDataEntries, addPatient };
