import { authenticationRouter } from "./router/authenticate-router";
import { booksRouter } from "./router/books-routers";
import { authentication } from "./controller/authentication-controller";
import { ErrorHandler } from "./middleware/error.middleware";
import express, { Response, Request } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import path from "path";
export const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(helmet());
app.use(express.json());

//these apis should generate or renew client's token. so we can let client to use them without check.
app.use("/v1/token", authenticationRouter);

//these apis have authentication middleware because client should has token before do anything. :)
app.use("/v1/books", authentication, booksRouter);

app.use(ErrorHandler);

app.use(express.static(path.join(__dirname, "..", "build")));
app.get("/*", (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
