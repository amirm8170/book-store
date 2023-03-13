import { Books } from "./../model/books.model";
import mongoose from "mongoose";
import { CustomErr } from "./../middleware/error.middleware";
import { RequestHandler } from "express";

export const deleteBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validId = mongoose.isValidObjectId(id);

    //check id like "get-book-byId" file.
    if (!id || !validId) {
      throw new CustomErr(404, "invalid id!");
    }

    //delete that book from db and return if in response.
    const book = await Books.findByIdAndRemove(id, { _id: 0, __v: 0 });

    if (!book) {
      throw new CustomErr(404, "there isn't any book with this id!");
    } else {
      return res.status(200).json(book);
    }
  } catch (error) {
    next(error);
  }
};
