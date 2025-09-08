import { Book, BookModel } from "../model/bookmodel";
import argon2 from "argon2";
import { Request, Response } from "express";

export const Createbook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, yearPublished, category, author } = req.body;
    if (!title || !yearPublished || !category || !author) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const checkifbookExists = await BookModel.findOne({ author });
    if (checkifbookExists) {
      res.status(400).json({ message: "Book already exists" });
      return;
    }
    const createBook = await BookModel.create({
      title,
      yearPublished,
      category,
      author,
    });
    res
      .status(201)
      .json({ message: "Book created successfully", data: createBook });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};

export const GetAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getAllBooks = await BookModel.find();
    if (!getAllBooks) {
      res.status(404).json({ message: "No book." });
    }
    res
      .status(200)
      .json({ message: "Users gotten successfully", data: getAllBooks });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};
export const GetOneBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const getOneBook = await BookModel.findById(id);
    if (!getOneBook) {
      res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book gotten successfully", data: getOneBook });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};
export const UpdateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, yearPublished, category, author } =
      req.body as Partial<Book>;

    const updateBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      { title, yearPublished, category, author },
      { new: true }
    );

    if (!updateBook) {
      res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book updated successfully", data: updateBook });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};
export const deleteAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleteAllBooks = await BookModel.deleteMany();

    if (!deleteAllBooks) {
      res.status(404).json({ message: "Books not found" });
    }

    res.status(200).json({ message: "Books deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};
export const deleteOneBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleteOneBook = await BookModel.findByIdAndDelete(req.params.id);
    if (!deleteOneBook) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "An error occurred", err: err.message });
  }
};
