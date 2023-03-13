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
const books_model_1 = require("./../model/books.model");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const correctDetailsOfBooks = {
    title: "test",
    description: "test",
    author: "test",
    year: 2023,
    cover: "http://test.com",
};
const updateDetailsOfBook = {
    title: "updateTest",
    description: "updateTest",
    author: "updateTest",
    year: 2023,
    cover: "http://updateTest.com",
};
let token;
describe("test CRUD in book-store", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        const user = yield user_model_1.User.findOne({ name: "test" });
        token = (0, authentication_helper_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user.id);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield books_model_1.Books.find({ title: "updateTest" }).deleteMany();
        yield user_model_1.User.find({ name: "test" }).deleteMany();
        yield mongoose_1.default.disconnect();
    }));
    //authentication test for all routes has the same result!
    describe("check CRUD in mongoDB in books-store application", () => {
        test("/POST ,it should return 401 if header doesn't have authorization", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .post("/books")
                .send(correctDetailsOfBooks)
                .expect(401);
            expect(res.body).toStrictEqual({
                error: {
                    statusCode: 401,
                    errorMessage: "missing authorization header!",
                },
            });
        }));
        test("/POST, it should be return 401 if token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .post("/books")
                .send(correctDetailsOfBooks)
                .set({ Authorization: "Bearer invalidToken" })
                .expect(401);
            expect(res.body).toStrictEqual({
                error: {
                    statusCode: 401,
                    errorMessage: "invalid or expired token!",
                },
            });
        }));
        test("/POST, it should be return 201 if client send correct data and valid token", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .post("/books")
                .send(correctDetailsOfBooks)
                .set({ Authorization: `Bearer ${token}` })
                .expect(201);
            expect(res.body).toBeDefined();
        }));
        test("/GET, it should return all books from db as json inside an array.", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .get("/books")
                .set({ Authorization: `Bearer ${token}` })
                .expect(200);
            expect(res.body).toBeDefined();
        }));
        test("/PUT, update a book with send the id in params and update details in body if id is valid and details are ", () => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield books_model_1.Books.findOne({ title: "test" });
            const id = book === null || book === void 0 ? void 0 : book.id;
            const res = yield (0, supertest_1.default)(app_1.app)
                .put(`/books/${id}`)
                .send(updateDetailsOfBook)
                .set({ Authorization: `Bearer ${token}` })
                .expect(201);
            expect(res.body).toBeDefined();
        }));
        test("/DELETE, delete book with id and and returns 200 as response", () => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield books_model_1.Books.findOne({ title: "updateTest" });
            const id = book === null || book === void 0 ? void 0 : book.id;
            const res = yield (0, supertest_1.default)(app_1.app)
                .del(`/books/${id}`)
                .set({ Authorization: `Bearer ${token}` })
                .expect(200);
            expect(res.body).toBeDefined();
        }));
        //this test has same result for all other routes. :)
        test("/DELETE, if client send invalid id, it returns 404 as response", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.app)
                .del(`/books/wrongId`)
                .set({ Authorization: `Bearer ${token}` })
                .expect(404);
            expect(res.body).toStrictEqual({
                error: {
                    statusCode: 404,
                    errorMessage: "invalid id!",
                },
            });
        }));
    });
});
