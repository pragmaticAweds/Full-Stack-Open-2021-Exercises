export type diagnoseType = {
  code: string;
  name: string;
  latin?: string;
};

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

export enum entryType {
  healthCheck = "HealthCheck",
  hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  employerName?: string;
  diagnosisCodes?: Array<diagnoseType["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: entryType.healthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: entryType.hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: entryType.OccupationalHealthcare;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;

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

export type entryFields = {
  description: unknown;
  type: unknown;
  date: unknown;
  specialist: unknown;
  employerName?: unknown;
  diagnosisCodes?: unknown;
  healthCheckRating?: unknown;
  discharge?: unknown;
  sickLeave?: unknown;
};
