"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseType = exports.isObjectType = exports.isEntryType = void 0;
const inputValidator_1 = require("./inputValidator");
const type_1 = require("./type");
const isEntryType = (type) => Object.values(type_1.EntryType).includes(type);
exports.isEntryType = isEntryType;
const isObjectType = (value) => typeof value === "object" || value instanceof Object;
exports.isObjectType = isObjectType;
const parseType = (type) => {
    if (!type || !(0, exports.isEntryType)(type)) {
        throw new Error("malformed entry " + type);
    }
    return type;
};
exports.parseType = parseType;
const validatePatientNewEntry = (obj) => {
    const newEntry = {
        type: (0, exports.parseType)(obj.type),
        description: (0, inputValidator_1.parseName)(obj.description),
        specialist: (0, inputValidator_1.parseName)(obj.specialist),
        date: (0, inputValidator_1.parseDateOfBirth)(obj.date),
    };
    return newEntry;
};
// export type entryFields = {
//   description: unknown;
//   type: unknown;
//   date: unknown;
//   specialist: unknown;
//   employerName: unknown;
//   diagnosisCodes: unknown;
//   healthCheckRating: unknown;
//   discharge: unknown;
//   sickLeave: unknown;
// };
