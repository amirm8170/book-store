import mongoose from "mongoose";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helper/authentication.helper";
import { User, validUser } from "../model/user.model";
import { CustomErr } from "../middleware/error.middleware";
import { RequestHandler } from "express";

//generateToken middleware to store refreshToken in db and return access token to client-side.
export const generateToken: RequestHandler = async (req, res, next) => {
  try {
    const { error } = validUser(req.body);
    if (error) {
      throw new CustomErr(400, error.message);
    }

    //generate this id manual, because we should generate tokens with this id so it's better to generate id manual instead of save data in db first then query to db to get id from db and generate tokens after that. :)
    const _id = new mongoose.Types.ObjectId();

    //here  I've used _id.toString() because without convert it to string it seems "ObjectId('random id')", so it should convert it to string to get "random id" alone.
    const refreshToken = generateRefreshToken(_id.toString());
    const accessToken = generateAccessToken(_id.toString());
    const newUser = new User({
      name: req.body.name,
      _id,
      refreshToken,
    });
    await newUser.save();

    return res.status(200).json({ accessToken , refreshToken });
  } catch (error) {
    next(error);
  }
};
