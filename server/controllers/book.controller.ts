import { RequestHandler } from "express";
import { Request, Response } from "express";
import { CreateBook } from "../actions/books/createBook";
import { DeleteBook } from "../actions/books/deleteBook";
import { GetAllBooks } from "../actions/books/getAllBooks";
import { GetBookById } from "../actions/books/getBookById";
import { BookModel } from "../models/book.model";

export const createBook: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const book = await CreateBook.make(req.body).execute();

    return res.status(201).json(book);
  } catch (error) {
    return res.status(422).json({ error });
  }
};

export const getBookById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id: string | undefined = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Error: id parameter not supplied" });
  }

  const book = await GetBookById.make(id).execute();

  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ error: "Error: book not found" });
  }
};

export const getAllBooks: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const books = BookModel.serializeMany(
    await GetAllBooks.make().execute(),
    "bookSerializer"
  );

  return res.status(200).json(books);
};

export const deleteBookById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id: string | undefined = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Error: id parameter not supplied" });
  }

  const book = await GetBookById.make(id).execute();

  if (book) {
    await DeleteBook.make(book).execute();

    return res.status(200).send({});
  } else {
    return res.status(404).json({ error: "Error: book not found" });
  }
};

export const testCreateEndpoint: RequestHandler = async (
  req: Request,
  res: Response
) => {
  await CreateBook.make({
    title: "test",
    author: "test author",
  }).execute();
  return res.status(204).json({ message: "Created" });
};
