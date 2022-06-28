import diagnosesData from "../../data/diagnoses.json";
import { diagnoseType } from "../utils/type";

const diagnoses: Array<diagnoseType> = diagnosesData;

const getDiagnoses = (): Array<diagnoseType> => diagnoses;

const addDiagnose = () => null;

export { getDiagnoses, addDiagnose };
