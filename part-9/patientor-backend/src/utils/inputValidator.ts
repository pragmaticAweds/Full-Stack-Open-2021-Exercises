import {
  newPatientEntry,
  Gender,
  inputFields,
  EntryType,
  HealthCheckRating,
  diagnoseType,
  SickLeave,
  Discharge,
} from "./type";

export const isString = (text: unknown): text is string =>
  typeof text === "string" || text instanceof String;

export const isDate = (date: string): boolean => Boolean(Date.parse(date));

export const isObject = (value: unknown) =>
  typeof value === "object" || value instanceof Object;

export const isGender = (gender: any): gender is Gender =>
  Object.values(Gender).includes(gender);

export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export const isEntryType = (type: any): type is EntryType =>
  Object.values(EntryType).includes(type);

export const isArrayOfString = (param: string[] | []): param is string[] =>
  param.every((str) => isString(str));

export const parseSickLeave = (obj: any): SickLeave => {
  if (!isObject(obj)) {
    throw new Error("invalid info " + obj);
  }
  const { startDate, endDate } = obj;
  return {
    startDate: parseDateOfBirth(startDate),
    endDate: parseDateOfBirth(endDate),
  };
};

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
  return gender as Gender;
};
export const parseDischarge = (obj: any): Discharge => {
  if (!isObject(obj)) {
    throw new Error("invalid info " + obj);
  }
  const { date, criteria } = obj;
  return {
    date: parseDateOfBirth(date),
    criteria: parseName(criteria),
  };
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

export const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error("invalid type " + type);
  }
  return type;
};

export const parseDiagnosesCode = (
  diagnosesCode: any
): Array<diagnoseType["code"]> => {
  if (!Array.isArray(diagnosesCode) || !isArrayOfString(diagnosesCode)) {
    throw new Error("invalid diagnoses code or empty " + diagnosesCode);
  }
  return diagnosesCode;
};

export const parseHealthCheckingRate = (
  healthRate: unknown
): HealthCheckRating => {
  if (!isHealthCheckRating(healthRate)) {
    throw new Error("invalid health rate " + healthRate);
  }
  return healthRate;
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
