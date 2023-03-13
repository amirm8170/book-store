"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_model_1 = require("./../model/user.model");
const authentication_helper_1 = require("./../helper/authentication.helper");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
describe("test authentication", () => {
    let refreshToken;
    let accessToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    describe("/POST refreshToken and accessToken", () => {
        test("it should return accessToken and refreshToken", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .post("/token")
                .send({ name: "test" })
                .expect(200);
            expect(res.body.refreshToken).toBeDefined();
            expect(res.body.accessToken).toBeDefined();
            refreshToken = res.body.refreshToken;
            accessToken = res.body.accessToken;
        }));
    });
    describe("/POST renew accessToken with refreshToken and return it", () => {
        test("it should give valid refreshToken and renew accessToken and return it.", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ refreshToken }, { _id: 1 });
            accessToken = (0, authentication_helper_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user.id);
            const res = yield (0, supertest_1.default)(app_1.app)
                .post("/token/renew")
                .send({ refreshToken })
                .expect(200);
            expect(res.body.accessToken).toBeDefined();
        }));
    });
});
