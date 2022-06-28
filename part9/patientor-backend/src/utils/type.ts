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

export type patientType = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: genderType;
  occupation: string;
};

export type newPatientEntry = Omit<patientType, "id">;

export type nonSensitivePatientsDataType = Omit<patientType, "ssn">;

export type inputFields = {
  name: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  dateOfBirth: unknown;
};
