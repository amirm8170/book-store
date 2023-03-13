import { generateToken } from '../controller/generate-token.controller';
import { updateBook } from "./../controller/update-book.controller";
import { getBookById } from "./../controller/get-book-byId.controller";
import { getAllBooks } from "./../controller/get-allBooks.controller";
import { createBook } from "../controller/create-book.controller";
import { Router } from "express";
import { deleteBook } from "../controller/delete-book.controller";
export const booksRouter = Router();

booksRouter.post("/", createBook);
booksRouter.get("/", getAllBooks);
booksRouter.get("/:id", getBookById);
booksRouter.put("/:id", updateBook);
booksRouter.delete("/:id", deleteBook);
