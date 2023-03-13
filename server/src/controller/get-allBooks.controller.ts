import { Books } from "./../model/books.model";
import { RequestHandler } from "express";

//get all books from db and hide _id and __v to show to the client side. so easy:))
export const getAllBooks: RequestHandler = async (req, res, next) => {
  try {
    const books = await Books.find({}, { _id: 1, __v: 0 });
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
