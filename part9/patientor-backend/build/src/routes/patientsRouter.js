"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientsService_1 = require("../services/patientsService");
const inputValidator_1 = __importDefault(require("../utils/inputValidator"));
const router = (0, express_1.Router)();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send((0, patientsService_1.nonSensitivePatientsDataEntries)());
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newEntry = (0, inputValidator_1.default)(req.body);
    try {
        const validEntry = (0, patientsService_1.addPatient)(newEntry);
        res.json(validEntry);
    }
    catch (error) {
        let err = "Something went Wrong";
        if (error instanceof Error) {
            err += " Error: " + error.message;
        }
        res.status(400).send(err);
    }
}));
exports.default = router;
