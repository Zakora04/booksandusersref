"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneBook = exports.deleteAllBooks = exports.UpdateBook = exports.GetOneBook = exports.GetAllBooks = exports.Createbook = void 0;
const bookmodel_1 = require("../model/bookmodel");
const Createbook = async (req, res) => {
    try {
        const { title, yearPublished, category, author } = req.body;
        if (!title || !yearPublished || !category || !author) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const checkifbookExists = await bookmodel_1.BookModel.findOne({ author });
        if (checkifbookExists) {
            res.status(400).json({ message: "Book already exists" });
            return;
        }
        const createBook = await bookmodel_1.BookModel.create({
            title,
            yearPublished,
            category,
            author,
        });
        res
            .status(201)
            .json({ message: "Book created successfully", data: createBook });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.Createbook = Createbook;
const GetAllBooks = async (req, res) => {
    try {
        const getAllBooks = await bookmodel_1.BookModel.find();
        if (!getAllBooks) {
            res.status(404).json({ message: "No book." });
        }
        res
            .status(200)
            .json({ message: "Users gotten successfully", data: getAllBooks });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.GetAllBooks = GetAllBooks;
const GetOneBook = async (req, res) => {
    try {
        const { id } = req.params;
        const getOneBook = await bookmodel_1.BookModel.findById(id);
        if (!getOneBook) {
            res.status(404).json({ message: "Book not found" });
        }
        res
            .status(200)
            .json({ message: "Book gotten successfully", data: getOneBook });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.GetOneBook = GetOneBook;
const UpdateBook = async (req, res) => {
    try {
        const { title, yearPublished, category, author } = req.body;
        const updateBook = await bookmodel_1.BookModel.findByIdAndUpdate(req.params.id, { title, yearPublished, category, author }, { new: true });
        if (!updateBook) {
            res.status(404).json({ message: "Book not found" });
        }
        res
            .status(200)
            .json({ message: "Book updated successfully", data: updateBook });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.UpdateBook = UpdateBook;
const deleteAllBooks = async (req, res) => {
    try {
        const deleteAllBooks = await bookmodel_1.BookModel.deleteMany();
        if (!deleteAllBooks) {
            res.status(404).json({ message: "Books not found" });
        }
        res.status(200).json({ message: "Books deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.deleteAllBooks = deleteAllBooks;
const deleteOneBook = async (req, res) => {
    try {
        const deleteOneBook = await bookmodel_1.BookModel.findByIdAndDelete(req.params.id);
        if (!deleteOneBook) {
            res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred", err: err.message });
    }
};
exports.deleteOneBook = deleteOneBook;
// import express, { Request, Response } from "express";
// import { Book, BookModel } from "../model/bookmodel";
// export const createBook = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { title, category, yearPublished, author } = req.body;
//     if (!title || !category || !yearPublished || !author) {
//       res.status(400).json({ message: "Please fill all fields" });
//     }
//     const checkifbookExists = await BookModel.findOne({ author });
//     if (!checkifbookExists) {
//       res.status(401).json({ message: "Author does not exist" });
//     }
//     const Bookcreation = await BookModel.create({
//       title,
//       category,
//       yearPublished,
//       author,
//     });
//     res
//       .status(201)
//       .json({ message: "Book created successfully", data: Bookcreation });
//   } catch (err) {
//     res.status(500).json({ message: "An error occured" });
//   }
// };
// export const Getbooks = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const getbooks = BookModel.find();
//     if (!getbooks) {
//       res.status(400).json({ message: "Books not found", data: getbooks });
//     }
//     res.status(200).json({ message: "Books gotten successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "An error occurred" });
//   }
// };
// export const Getabook = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const getabook = await BookModel.findById(id);
//     if (!getabook) {
//       res.status(404).json({ message: "Book not found" });
//     }
//     res
//       .status(200)
//       .json({ message: "Book gottrn successfully", data: getabook });
//   } catch (err: any) {
//     res.status(500).json({ message: "An error occurred", err: err.message });
//   }
// };
// export const upadteonebook = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { title, yearPublished, category, author } =
//       req.body as Partial<Book>;
//     const updateonebook = await BookModel.findByIdAndUpdate(
//       req.params.id,
//       { title, yearPublished, category, author },
//       { new: true }
//     );
//   } catch(err) {
//     res.status(500).json({message:"An err occurred"})
//   }
// };
//# sourceMappingURL=bookController.js.map