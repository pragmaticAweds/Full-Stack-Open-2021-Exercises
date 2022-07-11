import {
  parseDateOfBirth,
  parseDiagnosesCode,
  parseDischarge,
  parseHealthCheckingRate,
  parseName,
  parseSickLeave,
  parseType,
} from "./inputValidator";
import {
  entryFields,
  EntryType,
  NewBaseEntry,
  NewEntryWithoutId,
} from "./type";

const validateNewBaseEntry = (obj: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseType(obj.type),
    description: parseName(obj.description),
    specialist: parseName(obj.specialist),
    date: parseDateOfBirth(obj.date),
  };
  if (obj.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCode(obj.diagnosisCodes);
  }

  return newBaseEntry;
};

const validatePatientNewEntry = (obj: entryFields): NewEntryWithoutId => {
  const newEntry = validateNewBaseEntry(obj) as NewEntryWithoutId;
  switch (newEntry.type) {
    case EntryType.HealthCheck:
      return {
        ...newEntry,
        healthCheckRating: parseHealthCheckingRate(obj.healthCheckRating),
      };

    case EntryType.Hospital:
      return {
        ...newEntry,
        discharge: parseDischarge(obj.discharge),
      };

    case EntryType.OccupationalHealthcare:
      if (obj.sickLeave) {
        obj.sickLeave = parseSickLeave(obj.sickLeave);
      }

      return {
        ...newEntry,
        employerName: parseName(obj.employerName),
      };
    default:
      return newEntry;
  }
};

export default validatePatientNewEntry;
