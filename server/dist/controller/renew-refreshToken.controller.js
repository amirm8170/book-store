"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("./../middleware/error.middleware");
const renewAccessToken = (req, res, next) => {
    try {
        const { accessToken } = req.body;
        if (!refreshToken) {
            throw new error_middleware_1.CustomErr(400, "send your refreshToken please!");
        }
    }
    catch (error) {
        next(error);
    }
};
