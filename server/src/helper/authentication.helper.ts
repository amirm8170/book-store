import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN!;
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN!;

//generate accessToken and refreshToken with jwt to handle authentication.
export const generateAccessToken = (id: string) => {
  const accessToken = jwt.sign({ data: id }, ACCESS_TOKEN, {
    expiresIn: "15m", // its just for test, in real projects we can expires this token in 1 day.
  });
  return accessToken ;
};
export const generateRefreshToken = (id: string) => {
  const refreshToken = jwt.sign({ data: id }, REFRESH_TOKEN, {
    expiresIn: "14d",
  });
  return  refreshToken ;
};

export const verifyAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, ACCESS_TOKEN) as { data: string };
    return payload.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const payload = jwt.verify(token, REFRESH_TOKEN) as { data: string };
    return payload.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
