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
exports.deleteBook = void 0;
const books_model_1 = require("./../model/books.model");
const mongoose_1 = __importDefault(require("mongoose"));
const error_middleware_1 = require("./../middleware/error.middleware");
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const validId = mongoose_1.default.isValidObjectId(id);
        //check id like "get-book-byId" file.
        if (!id || !validId) {
            throw new error_middleware_1.CustomErr(404, "invalid id!");
        }
        //delete that book from db and return if in response.
        const book = yield books_model_1.Books.findByIdAndRemove(id, { _id: 0, __v: 0 });
        if (!book) {
            throw new error_middleware_1.CustomErr(404, "there isn't any book with this id!");
        }
        else {
            return res.status(200).json(book);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
