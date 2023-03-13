import { renewAccessToken } from './../controller/renew-accessToken.controller';
import { generateToken } from "./../controller/generate-token.controller";
import { Router } from "express";

export const authenticationRouter = Router();

authenticationRouter.post("/", generateToken);
authenticationRouter.post("/renew", renewAccessToken);
