import patientsEntries from "../../data/patients.json";
import { patientType, nonSensitivePatientsDataType } from "../type";

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

const addPatient = () => null;

export { patientsDataEntries, nonSensitivePatientsDataEntries, addPatient };
