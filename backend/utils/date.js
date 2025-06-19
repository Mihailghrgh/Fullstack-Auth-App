"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fiveMinutesAgo = exports.fiveMinutesFromNow = exports.thirtySecondsAgo = exports.ONE_DAY_MS = exports.fifteenMinutesFromNow = exports.thirtyDaysFromNow = exports.oneYearFromNow = void 0;
const oneYearFromNow = () => {
    return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
};
exports.oneYearFromNow = oneYearFromNow;
const thirtyDaysFromNow = () => {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
};
exports.thirtyDaysFromNow = thirtyDaysFromNow;
const fifteenMinutesFromNow = () => {
    return new Date(Date.now() + 15 * 60 * 1000);
};
exports.fifteenMinutesFromNow = fifteenMinutesFromNow;
exports.ONE_DAY_MS = 24 * 60 * 60 * 1000;
const thirtySecondsAgo = () => new Date(Date.now() - 30 * 1000);
exports.thirtySecondsAgo = thirtySecondsAgo;
const fiveMinutesFromNow = () => new Date(Date.now() + 5 * 60 * 1000);
exports.fiveMinutesFromNow = fiveMinutesFromNow;
const fiveMinutesAgo = () => new Date(Date.now() - 5 * 60 * 1000);
exports.fiveMinutesAgo = fiveMinutesAgo;
