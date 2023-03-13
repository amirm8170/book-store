import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

const userSchema = new Schema({
  name: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

export const validUser = (userInfo: Document) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(300),
  });
  return schema.validate(userInfo);
};

export const User = mongoose.model<Document>("users", userSchema);
