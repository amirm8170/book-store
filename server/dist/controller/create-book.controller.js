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
exports.createBook = void 0;
const books_model_1 = require("./../model/books.model");
const error_middleware_1 = require("../middleware/error.middleware");
const books_model_2 = require("../model/books.model");
// Create a new book
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validate data first of all with joi
        const { error } = (0, books_model_2.validBook)(req.body);
        if (error) {
            throw new error_middleware_1.CustomErr(400, error.message);
        }
        //save valid data in db
        const newBook = new books_model_1.Books({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            year: req.body.year,
            cover: req.body.cover,
        });
        yield newBook.save();
        //return all newBooks data that saved in db.
        return res.status(201).json(newBook);
        //catch errors and pass them to error handler for return errors.
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
