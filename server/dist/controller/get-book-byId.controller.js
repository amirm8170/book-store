"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookById = void 0;
const error_middleware_1 = require("./../middleware/error.middleware");
const books_model_1 = require("./../model/books.model");
const mongoose_1 = __importDefault(require("mongoose"));
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 60, checkperiod: 120 });
//get id from req.params and check it if there is in db, return that book.
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const validId = mongoose_1.default.isValidObjectId(id);
        const cacheData = cache.get(id);
        // for have better time complexity to return error before check that id from db, check validate id and be required id first of all.
        if (!id || !validId) {
            throw new error_middleware_1.CustomErr(404, "invalid id!");
        }
        //for have better time complexity I've used cached to check if that data there is in it so it can return it, if not so it can gives data from db and set it to cache.
        if (cacheData) {
            return res.status(200).json({ book: cacheData });
        }
        else {
            //if id was valid, so we can check it in db to know that is there a book with this id or no.
            const isBook = yield books_model_1.Books.findById(id, { _id: 0, __v: 0 });
            if (!isBook) {
                throw new error_middleware_1.CustomErr(404, "there isn't any book with this id!");
            }
            else {
                cache.set(id, isBook);
                return res.status(200).json({ book: isBook });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getBookById = getBookById;
