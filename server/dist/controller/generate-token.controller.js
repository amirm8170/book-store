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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authentication_helper_1 = require("../helper/authentication.helper");
const user_model_1 = require("../model/user.model");
const error_middleware_1 = require("../middleware/error.middleware");
//generateToken middleware to store refreshToken in db and return access token to client-side.
const generateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, user_model_1.validUser)(req.body);
        if (error) {
            throw new error_middleware_1.CustomErr(400, error.message);
        }
        //generate this id manual, because we should generate tokens with this id so it's better to generate id manual instead of save data in db first then query to db to get id from db and generate tokens after that. :)
        const _id = new mongoose_1.default.Types.ObjectId();
        //here  I've used _id.toString() because without convert it to string it seems "ObjectId('random id')", so it should convert it to string to get "random id" alone.
        const refreshToken = (0, authentication_helper_1.generateRefreshToken)(_id.toString());
        const accessToken = (0, authentication_helper_1.generateAccessToken)(_id.toString());
        const newUser = new user_model_1.User({
            name: req.body.name,
            _id,
            refreshToken,
        });
        yield newUser.save();
        return res.status(200).json({ accessToken, refreshToken });
    }
    catch (error) {
        next(error);
    }
});
exports.generateToken = generateToken;
