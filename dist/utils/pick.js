"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, key) => {
    const result = {};
    key.forEach((el) => {
        if (el in obj) {
            result[el] = obj[el];
        }
    });
    return result;
};
exports.default = pick;
