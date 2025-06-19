"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const session_controller_1 = require("../controller/session.controller");
const session_controller_2 = require("../controller/session.controller");
exports.sessionRoutes = (0, express_1.Router)();
exports.sessionRoutes.get("/", session_controller_1.findSessionHandler);
exports.sessionRoutes.delete("/:id", session_controller_2.deleteSessionHandler);
