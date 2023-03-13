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
exports.renewAccessToken = void 0;
const user_model_1 = require("./../model/user.model");
const authentication_helper_1 = require("./../helper/authentication.helper");
const error_middleware_1 = require("../middleware/error.middleware");
/*this is one of the most important apis for secure our app.
we can give name and refreshToken from client and check if refreshToken is valid,
we can check that if this payloadId is for that user, who client send us or no,
it can one of the highest way to secure this api.
because we don't want to send accessToken to invalid user.
*/
const renewAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get refreshToken from client.
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new error_middleware_1.CustomErr(400, "refreshToken is required!");
        }
        //check validation of refreshToken
        const payloadId = (0, authentication_helper_1.verifyRefreshToken)(refreshToken);
        if (!payloadId) {
            throw new error_middleware_1.CustomErr(400, "invalid token!");
        }
        //check if this id is equal to the name that client sent.
        const user = yield user_model_1.User.findById(payloadId);
        if (!user) {
            throw new error_middleware_1.CustomErr(400, "invalid token!");
        }
        // now if everything is going fine, we can generate new accessToken and return it.
        const accessToken = (0, authentication_helper_1.generateAccessToken)(payloadId);
        return res.status(200).json({ accessToken });
    }
    catch (error) {
        next(error);
    }
});
exports.renewAccessToken = renewAccessToken;
