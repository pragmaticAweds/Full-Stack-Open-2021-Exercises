import { newPatientEntry, Gender, inputFields } from "./type";

const isString = (text: unknown): text is string =>
  typeof text === "string" || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (gender: any): gender is Gender =>
  Object.values(Gender).includes(gender);

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("malformed entry " + name);
  }
  return name;
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("malformed entry " + gender);
  }
  return gender;
};

export const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("malformed entry " + ssn);
  }
  return ssn;
};

export const parseDateOfBirth = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error("malformed entry " + dob);
  }
  return dob;
};

export const parseOccupation = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("malformed entry " + text);
  }
  return text;
};

const toNewPatientEntry = (obj: inputFields): newPatientEntry => {
  const newEntry: newPatientEntry = {
    name: parseName(obj.name),
    dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    ssn: parseSsn(obj.ssn),
  };
  return newEntry;
};
export default toNewPatientEntry;
