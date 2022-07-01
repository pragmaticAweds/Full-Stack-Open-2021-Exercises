"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.nonSensitivePatientsDataEntries = exports.patientsDataEntries = void 0;
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const uuid_1 = require("uuid");
const patientsData = patients_json_1.default;
const patientsDataEntries = () => patientsData;
exports.patientsDataEntries = patientsDataEntries;
const nonSensitivePatientsDataEntries = () => patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
}));
exports.nonSensitivePatientsDataEntries = nonSensitivePatientsDataEntries;
const id = (0, uuid_1.v1)();
const addPatient = (entry) => {
    const newEntry = Object.assign({ id }, entry);
    console.log({ newEntry });
    patients_json_1.default.push(newEntry);
    return newEntry;
};
exports.addPatient = addPatient;
