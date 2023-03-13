"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const user_model_1 = require("./../model/user.model");
const authentication_helper_1 = require("./../helper/authentication.helper");
const error_middleware_1 = require("./../middleware/error.middleware");
//authentication middleware
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check header first of all if it has authorization or not.
        const { authorization } = req.headers;
        if (!authorization) {
            throw new error_middleware_1.CustomErr(401, "missing authorization header!");
        }
        //get token from "Bearer 'token'", and if is valid, it returns decode id.
        const token = authorization.split(" ")[1];
        const payloadId = (0, authentication_helper_1.verifyAccessToken)(token);
        if (!payloadId) {
            throw new error_middleware_1.CustomErr(401, "invalid or expired token!");
        }
        //to check if that id is valid in db or no,
        const user = yield user_model_1.User.findById(payloadId);
        if (!user) {
            throw new error_middleware_1.CustomErr(401, "invalid token but you want to attack me!! :)");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authentication = authentication;
