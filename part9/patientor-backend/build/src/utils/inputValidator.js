"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOccupation = exports.parseDateOfBirth = exports.parseSsn = exports.parseGender = exports.parseName = exports.isGender = exports.isDate = exports.isString = void 0;
const type_1 = require("./type");
const isString = (text) => typeof text === "string" || text instanceof String;
exports.isString = isString;
const isDate = (date) => Boolean(Date.parse(date));
exports.isDate = isDate;
const isGender = (gender) => Object.values(type_1.Gender).includes(gender);
exports.isGender = isGender;
const parseName = (name) => {
    if (!name || !(0, exports.isString)(name)) {
        throw new Error("malformed entry " + name);
    }
    return name;
};
exports.parseName = parseName;
const parseGender = (gender) => {
    if (!gender || !(0, exports.isGender)(gender)) {
        throw new Error("malformed entry " + gender);
    }
    return gender;
};
exports.parseGender = parseGender;
const parseSsn = (ssn) => {
    if (!ssn || !(0, exports.isString)(ssn)) {
        throw new Error("malformed entry " + ssn);
    }
    return ssn;
};
exports.parseSsn = parseSsn;
const parseDateOfBirth = (dob) => {
    if (!dob || !(0, exports.isString)(dob) || !(0, exports.isDate)(dob)) {
        throw new Error("malformed entry " + dob);
    }
    return dob;
};
exports.parseDateOfBirth = parseDateOfBirth;
const parseOccupation = (text) => {
    if (!text || !(0, exports.isString)(text)) {
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
