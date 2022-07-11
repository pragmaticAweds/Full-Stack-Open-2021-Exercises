import patientsEntries from "../../data/patients";
import { v1 as uuid } from "uuid";

import {
  patientType,
  PublicPatient,
  newPatientEntry,
  NewEntryWithoutId,
} from "../utils/type";

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
  const newPatientEntry = {
    id,
    entries: [],
    ...entry,
  };

  patientsEntries.push(newPatientEntry);

  return newPatientEntry;
};

const singleUser = (id: string): patientType | undefined => {
  const patient = patientsData.find((patient) => patient.id === id);
  return patient;
};

const addPatientEntry = (
  userId: string,
  entry: NewEntryWithoutId
): NewEntryWithoutId => {
  const newEntry = {
    id,
    ...entry,
  };
  const foundUser = patientsEntries.find(({ id }) => id === userId);
  console.log({ newEntry, foundUser });
  if (foundUser) {
    foundUser.entries?.push(newEntry);
  }
  return newEntry;
};

export {
  patientsDataEntries,
  nonSensitivePatientsDataEntries,
  addPatient,
  addPatientEntry,
  singleUser,
};
