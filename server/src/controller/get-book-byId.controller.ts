import { CustomErr } from "./../middleware/error.middleware";
import { Books } from "./../model/books.model";
import mongoose from "mongoose";
import { RequestHandler } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

//get id from req.params and check it if there is in db, return that book.
export const getBookById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validId = mongoose.isValidObjectId(id);
    const cacheData = cache.get(id);

    // for have better time complexity to return error before check that id from db, check validate id and be required id first of all.
    if (!id || !validId) {
      throw new CustomErr(404, "invalid id!");
    }

    //for have better time complexity I've used cached to check if that data there is in it so it can return it, if not so it can gives data from db and set it to cache.
    if (cacheData) {
      return res.status(200).json({ book: cacheData });
    } else {
      //if id was valid, so we can check it in db to know that is there a book with this id or no.
      const isBook = await Books.findById(id, { _id: 0, __v: 0 });
      if (!isBook) {
        throw new CustomErr(404, "there isn't any book with this id!");
      } else {
        cache.set(id, isBook);
        return res.status(200).json({ book: isBook });
      }
    }
  } catch (error) {
    next(error);
  }
};
