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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface patientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: genderType;
  occupation: string;
  entries: Entry[];
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
