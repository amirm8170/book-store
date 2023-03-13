"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const authenticate_router_1 = require("./router/authenticate-router");
const books_routers_1 = require("./router/books-routers");
const authentication_controller_1 = require("./controller/authentication-controller");
const error_middleware_1 = require("./middleware/error.middleware");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
exports.app.use((0, morgan_1.default)("combined"));
exports.app.use((0, cors_1.default)());
exports.app.use((0, helmet_1.default)());
exports.app.use(express_1.default.json());
//these apis should generate or renew client's token. so we can let client to use them without check.
exports.app.use("/v1/token", authenticate_router_1.authenticationRouter);
//these apis have authentication middleware because client should has token before do anything. :)
exports.app.use("/v1/books", authentication_controller_1.authentication, books_routers_1.booksRouter);
exports.app.use(error_middleware_1.ErrorHandler);
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "..", "build")));
exports.app.get("/*", (req, res) => {
    return res.sendFile(path_1.default.join(__dirname, "..", "build", "index.html"));
});
