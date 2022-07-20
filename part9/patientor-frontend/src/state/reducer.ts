import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };

    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case "SINGLE_PATIENT":
      const data = action.payload;

      const findPatient = state.patientRecords;
      console.log({ findPatient });
      if (!findPatient || !findPatient.hasOwnProperty(data.id)) {
        return {
          ...state,
          patientRecords: data,
        };
      } else {
        return state;
      }

    case "UPDATE_PATIENT":
      const newEntry = action.payload;
      const findEntry = state.patientRecords?.entries?.find(
        (entry) => entry.id === newEntry.id
      );
      if (!findEntry) {
        state.patientRecords?.entries?.push(newEntry);
      }
      return state;
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data,
  };
};

export const addPatient = (data: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: data,
  };
};

export const updatePatient = (data: Entry): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: data,
  };
};

export const setSinglePatient = (data: Patient): Action => {
  return {
    type: "SINGLE_PATIENT",
    payload: data,
  };
};

export const setDiagnosis = (data: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: data,
  };
};
