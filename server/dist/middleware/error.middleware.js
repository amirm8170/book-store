"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.CustomErr = void 0;
class CustomErr extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.CustomErr = CustomErr;
const ErrorHandler = (err, req, res, next) => {
    console.log(err.stack);
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "something went wrong!";
    return res.status(statusCode).json({ error: { statusCode, errorMessage } });
};
exports.ErrorHandler = ErrorHandler;
