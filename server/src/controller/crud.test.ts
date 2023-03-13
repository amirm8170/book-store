import { User } from "./../model/user.model";
import { generateAccessToken } from "./../helper/authentication.helper";
import { Books } from "./../model/books.model";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import * as dotenv from "dotenv";
dotenv.config();

const correctDetailsOfBooks = {
  title: "test",
  description: "test",
  author: "test",
  year: 2023,
  cover: "http://test.com",
};
const updateDetailsOfBook = {
  title: "updateTest",
  description: "updateTest",
  author: "updateTest",
  year: 2023,
  cover: "http://updateTest.com",
};

let token: string;

describe("test CRUD in book-store", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    const user = await User.findOne({ name: "test" });
    token = generateAccessToken(user?.id);
  });
  afterAll(async () => {
    await Books.find({ title: "updateTest" }).deleteMany();
    await User.find({ name: "test" }).deleteMany();
    await mongoose.disconnect();
  });

  //authentication test for all routes has the same result!
  describe("check CRUD in mongoDB in books-store application", () => {
    test("/POST ,it should return 401 if header doesn't have authorization", async () => {
      const res = await request(app)
        .post("/books")
        .send(correctDetailsOfBooks)
        .expect(401);

      expect(res.body).toStrictEqual({
        error: {
          statusCode: 401,
          errorMessage: "missing authorization header!",
        },
      });
    });

    test("/POST, it should be return 401 if token is invalid", async () => {
      const res = await request(app)
        .post("/books")
        .send(correctDetailsOfBooks)
        .set({ Authorization: "Bearer invalidToken" })
        .expect(401);

      expect(res.body).toStrictEqual({
        error: {
          statusCode: 401,
          errorMessage: "invalid or expired token!",
        },
      });
    });

    test("/POST, it should be return 201 if client send correct data and valid token", async () => {
      const res = await request(app)
        .post("/books")
        .send(correctDetailsOfBooks)
        .set({ Authorization: `Bearer ${token}` })
        .expect(201);

      expect(res.body).toBeDefined();
    });

    test("/GET, it should return all books from db as json inside an array.", async () => {
      const res = await request(app)
        .get("/books")
        .set({ Authorization: `Bearer ${token}` })
        .expect(200);
      expect(res.body).toBeDefined();
    });

    test("/PUT, update a book with send the id in params and update details in body if id is valid and details are ", async () => {
      const book = await Books.findOne({ title: "test" });
      const id = book?.id;
      const res = await request(app)
        .put(`/books/${id}`)
        .send(updateDetailsOfBook)
        .set({ Authorization: `Bearer ${token}` })
        .expect(201);
      expect(res.body).toBeDefined();
    });

    test("/DELETE, delete book with id and and returns 200 as response", async () => {
      const book = await Books.findOne({ title: "updateTest" });
      const id = book?.id;
      const res = await request(app)
        .del(`/books/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(200);
      expect(res.body).toBeDefined();
    });

    //this test has same result for all other routes. :)
    test("/DELETE, if client send invalid id, it returns 404 as response", async () => {
      const res = await request(app)
        .del(`/books/wrongId`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(404);

      expect(res.body).toStrictEqual({
        error: {
          statusCode: 404,
          errorMessage: "invalid id!",
        },
      });
    });
  });
});
