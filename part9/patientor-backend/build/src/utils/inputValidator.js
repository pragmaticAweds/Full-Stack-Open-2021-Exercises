"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOccupation = exports.parseDateOfBirth = exports.parseSsn = exports.parseGender = exports.parseName = void 0;
const type_1 = require("./type");
const isString = (text) => typeof text === "string" || text instanceof String;
const isDate = (date) => Boolean(Date.parse(date));
const isGender = (gender) => Object.values(type_1.Gender).includes(gender);
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("malformed entry " + name);
    }
    return name;
};
exports.parseName = parseName;
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("malformed entry " + gender);
    }
    return gender;
};
exports.parseGender = parseGender;
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error("malformed entry " + ssn);
    }
    return ssn;
};
exports.parseSsn = parseSsn;
const parseDateOfBirth = (dob) => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error("malformed entry " + dob);
    }
    return dob;
};
exports.parseDateOfBirth = parseDateOfBirth;
const parseOccupation = (text) => {
    if (!text || !isString(text)) {
        throw new Error("malformed entry " + text);
    }
    return text;
};
exports.parseOccupation = parseOccupation;
const toNewPatientEntry = (obj) => {
    const newEntry = {
        name: (0, exports.parseName)(obj.name),
        dateOfBirth: (0, exports.parseDateOfBirth)(obj.dateOfBirth),
        gender: (0, exports.parseGender)(obj.gender),
        occupation: (0, exports.parseOccupation)(obj.occupation),
        ssn: (0, exports.parseSsn)(obj.ssn),
    };
    return newEntry;
};
exports.default = toNewPatientEntry;
