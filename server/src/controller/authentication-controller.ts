import { User } from "./../model/user.model";
import { verifyAccessToken } from "./../helper/authentication.helper";
import { CustomErr } from "./../middleware/error.middleware";
import { RequestHandler } from "express";

//authentication middleware
export const authentication: RequestHandler = async (req, res, next) => {
  try {
    //check header first of all if it has authorization or not.
    const { authorization } = req.headers;

    if (!authorization) {
      throw new CustomErr(401, "missing authorization header!");
    }

    //get token from "Bearer 'token'", and if is valid, it returns decode id.
    const token = authorization!.split(" ")[1];
    const payloadId = verifyAccessToken(token);
    if (!payloadId) {
      throw new CustomErr(401, "invalid or expired token!");
    }
    //to check if that id is valid in db or no,
    const user = await User.findById(payloadId);
    if (!user) {
      throw new CustomErr(401, "invalid token but you want to attack me!! :)");
    }
    next();
  } catch (error) {
    next(error);
  }
};
