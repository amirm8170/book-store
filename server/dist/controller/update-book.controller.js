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
exports.updateBook = void 0;
const books_model_1 = require("./../model/books.model");
const error_middleware_1 = require("./../middleware/error.middleware");
const mongoose_1 = __importDefault(require("mongoose"));
//update book with id.
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const validId = mongoose_1.default.isValidObjectId(id);
        const { title, description, author, year, cover } = req.body;
        const updateData = {
            title,
            description,
            author,
            year,
            cover,
        };
        //check id like "get-book-byId" file.
        if (!id || !validId) {
            throw new error_middleware_1.CustomErr(404, "invalid id!");
        }
        const book = yield books_model_1.Books.findById(id, { _id: 0, __v: 0 });
        if (!book) {
            throw new error_middleware_1.CustomErr(404, "there isn't any book with this id!");
            //update and return updated data. update data with any data from req.body if that "key" existed in db.
        }
        else {
            const newBook = yield books_model_1.Books.findByIdAndUpdate(id, {
                $set: updateData,
            }, { new: true });
            return res.status(201).json({ newBook });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
