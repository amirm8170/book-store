import { Books } from "./../model/books.model";
import { CustomErr } from "./../middleware/error.middleware";
import mongoose from "mongoose";
import { RequestHandler } from "express";

//update book with id.
export const updateBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validId = mongoose.isValidObjectId(id);
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
      throw new CustomErr(404, "invalid id!");
    }
    const book = await Books.findById(id, { _id: 0, __v: 0 });

    if (!book) {
      throw new CustomErr(404, "there isn't any book with this id!");

      //update and return updated data. update data with any data from req.body if that "key" existed in db.
    } else {
      const newBook = await Books.findByIdAndUpdate(
        id,
        {
          $set: updateData,
        },
        { new: true }
      );
      return res.status(201).json({ newBook });
    }
  } catch (error) {
    next(error);
  }
};
