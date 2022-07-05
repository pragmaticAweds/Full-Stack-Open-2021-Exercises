export type diagnoseType = {
  code: string;
  name: string;
  latin?: string;
};

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown
//   ? Omit<T, K>
//   : never;
// // Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, "id">;

export type genderType = "male" | "female";

export enum Gender {
  male = "male",
  female = "female",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  employerName?: string;
  diagnosisCodes?: Array<diagnoseType["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface patientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: genderType;
  occupation: string;
  entries?: Entry[];
}

export type newPatientEntry = Omit<patientType, "id" | "entries">;

export type PublicPatient = Omit<patientType, "ssn" | "entries">;

export type inputFields = {
  name: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  dateOfBirth: unknown;
};
