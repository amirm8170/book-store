import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

//create mongoose schema
const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    cover: String,
  },
  { timestamps: true }
);

//validate data before save in database with joi
export const validBook = (bookInfo: Document) => {
  const schema = Joi.object({
    title: Joi.string().required().max(255),
    description: Joi.string().required().max(2000),
    author: Joi.string().required().max(255),
    year: Joi.number().min(0).max(new Date().getFullYear()).required(),
    cover: Joi.string().max(1000).uri().required(),
  });
  return schema.validate(bookInfo);
};

export const Books = mongoose.model<Document>("books", bookSchema);
