"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_http_1 = require("node:http");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const auth_route_1 = require("./routes/auth.route");
const authenticate_1 = __importDefault(require("./middleware/authenticate"));
const user_route_1 = require("./routes/user.route");
const session_route_1 = require("./routes/session.route");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", //"http://localhost:3000" (Next.js frontend)
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", server: "running" });
});
// Routes
app.use("/auth", auth_route_1.authRoutes);
app.use("/user", authenticate_1.default, user_route_1.userRoutes);
app.use("/sessions", authenticate_1.default, session_route_1.sessionRoutes);
app.use(errorHandler_1.default);
const httpServer = (0, node_http_1.createServer)(app);
httpServer.listen(port, () => {
    console.log(`>>>>>>>> Server running on http://localhost:${port}`);
});
