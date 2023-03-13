import { User } from "./../model/user.model";
import {
  verifyRefreshToken,
  generateAccessToken,
} from "./../helper/authentication.helper";
import { CustomErr } from "../middleware/error.middleware";
import { RequestHandler } from "express";

/*this is one of the most important apis for secure our app.
we can give name and refreshToken from client and check if refreshToken is valid, 
we can check that if this payloadId is for that user, who client send us or no,
it can one of the highest way to secure this api.
because we don't want to send accessToken to invalid user. 
*/

export const renewAccessToken: RequestHandler = async (req, res, next) => {
  try {
    //get refreshToken from client.
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new CustomErr(400, "refreshToken is required!");
    }

    //check validation of refreshToken
    const payloadId = verifyRefreshToken(refreshToken);
    if (!payloadId) {
      throw new CustomErr(400, "invalid token!");
    }

    //check if this id is equal to the name that client sent.
    const user = await User.findById(payloadId);
    if (!user) {
      throw new CustomErr(400, "invalid token!");
    }

    // now if everything is going fine, we can generate new accessToken and return it.
    const accessToken = generateAccessToken(payloadId);

    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
