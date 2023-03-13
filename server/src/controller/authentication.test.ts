import { User } from "./../model/user.model";
import { generateAccessToken } from "./../helper/authentication.helper";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import * as dotenv from "dotenv";
dotenv.config();

describe("test authentication", () => {
  let refreshToken: string;
  let accessToken: string;

  beforeAll(async (): Promise<void> => {
    
    await mongoose.connect(process.env.MONGO_URI!);
  });
  afterAll(async (): Promise<void> => {
    await mongoose.disconnect();
  });

  describe("/POST refreshToken and accessToken", (): void => {
    test("it should return accessToken and refreshToken", async (): Promise<void> => {
      const res = await request(app)
        .post("/v1/token")
        .send({ name: "test" })
        .expect(200);
      expect(res.body.refreshToken).toBeDefined();
      expect(res.body.accessToken).toBeDefined();
      refreshToken = res.body.refreshToken;
      accessToken = res.body.accessToken;
    });
  });

  describe("/POST renew accessToken with refreshToken and return it", (): void => {
    test("it should give valid refreshToken and renew accessToken and return it.", async (): Promise<void> => {
      const user = await User.findOne({ refreshToken }, { _id: 1 });
      accessToken = generateAccessToken(user?.id);
      const res = await request(app)
        .post("/v1/token/renew")
        .send({ refreshToken })
        .expect(200);
      expect(res.body.accessToken).toBeDefined();
    });
  });
});
