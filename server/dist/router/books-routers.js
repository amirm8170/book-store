"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const update_book_controller_1 = require("./../controller/update-book.controller");
const get_book_byId_controller_1 = require("./../controller/get-book-byId.controller");
const get_allBooks_controller_1 = require("./../controller/get-allBooks.controller");
const create_book_controller_1 = require("../controller/create-book.controller");
const express_1 = require("express");
const delete_book_controller_1 = require("../controller/delete-book.controller");
exports.booksRouter = (0, express_1.Router)();
exports.booksRouter.post("/", create_book_controller_1.createBook);
exports.booksRouter.get("/", get_allBooks_controller_1.getAllBooks);
exports.booksRouter.get("/:id", get_book_byId_controller_1.getBookById);
exports.booksRouter.put("/:id", update_book_controller_1.updateBook);
exports.booksRouter.delete("/:id", delete_book_controller_1.deleteBook);