"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const renew_accessToken_controller_1 = require("./../controller/renew-accessToken.controller");
const generate_token_controller_1 = require("./../controller/generate-token.controller");
const express_1 = require("express");
exports.authenticationRouter = (0, express_1.Router)();
exports.authenticationRouter.post("/", generate_token_controller_1.generateToken);
exports.authenticationRouter.post("/renew", renew_accessToken_controller_1.renewAccessToken);
