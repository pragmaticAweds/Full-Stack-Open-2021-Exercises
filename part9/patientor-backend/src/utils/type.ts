export type diagnoseType = {
  code: string;
  name: string;
  latin?: string;
};

export type genderType = "male" | "female";

export type entryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

export enum Gender {
  male = "male",
  female = "female",
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  type: EntryType;
  specialist: string;
  diagnosisCodes?: Array<diagnoseType["code"]>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
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

export type NewBaseEntry = Omit<BaseEntry, "id">;

export type NewEntryWithoutId = UnionOmit<Entry, "id">;

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
