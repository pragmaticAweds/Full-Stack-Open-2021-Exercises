export type diagnoseType = {
  code: string;
  name: string;
  latin?: string;
};

export type genderType = "male" | "female";

export type patientType = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: genderType;
  occupation: string;
};

export type nonSensitivePatientsDataType = Omit<patientType, "ssn">;
