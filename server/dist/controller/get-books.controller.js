"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = void 0;
const error_middleware_1 = require("./../middleware/error.middleware");
const books_model_1 = require("./../model/books.model");
// Create a new book
const createBook = (req, res, next) => {
    try {
        const { error } = (0, books_model_1.validBook)(req.body);
        if (error) {
            throw new error_middleware_1.CustomErr(400, error.message);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.createBook = createBook;
