"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchError = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    }
    catch (error) {
        console.log("Error has been caught", error);
        next(error);
    }
};
exports.default = catchError;
