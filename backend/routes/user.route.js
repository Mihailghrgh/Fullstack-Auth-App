"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
exports.userRoutes = (0, express_1.Router)();
//userRoutes
exports.userRoutes.get("/", user_controller_1.getUserHandler);
