import { parseDateOfBirth, parseName } from "./inputValidator";
import { entryFields, entryType, EntryWithoutId } from "./type";

export const isEntryType = (type: any): type is entryType =>
  Object.values(entryType).includes(type);

export const isObjectType = (value: unknown) =>
  typeof value === "object" || value instanceof Object;

export const parseType = (type: unknown): entryType => {
  if (!type || !isEntryType(type)) {
    throw new Error("malformed entry " + type);
  }
  return type;
};

const validatePatientNewEntry = (obj: entryFields): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    type: parseType(obj.type),
    description: parseName(obj.description),
    specialist: parseName(obj.specialist),
    date: parseDateOfBirth(obj.date),
  };
  return newEntry;
};

// export type entryFields = {
//   description: unknown;
//   type: unknown;
//   date: unknown;
//   specialist: unknown;
//   employerName: unknown;
//   diagnosisCodes: unknown;
//   healthCheckRating: unknown;
//   discharge: unknown;
//   sickLeave: unknown;
// };
