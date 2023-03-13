import { Books } from "./../model/books.model";
import { CustomErr } from "../middleware/error.middleware";
import { validBook } from "../model/books.model";
import { RequestHandler } from "express";
import { Document } from "mongoose";

// Create a new book
export const createBook: RequestHandler = async (req, res, next) => {
  try {
    //validate data first of all with joi
    const { error } = validBook(req.body);
    if (error) {
      throw new CustomErr(400, error.message);
    }
    //save valid data in db
    const newBook: Document = new Books({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      year: req.body.year,
      cover: req.body.cover,
    });
    await newBook.save();

    //return all newBooks data that saved in db.
    return res.status(201).json(newBook);

    //catch errors and pass them to error handler for return errors.
  } catch (error) {
    next(error);
  }
};
