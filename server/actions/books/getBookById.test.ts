import * as dynamoose from "dynamoose";
import { CreateBook, CreateBookObject } from "./createBook";
import { GetAllBooks } from "./getAllBooks";
import { BookModel } from "../../models/book.model";
import { GetBookById } from "./getBookById";

dynamoose.aws.ddb.local("http://localhost:3004");

afterEach(async () => {
  const allBooks = await GetAllBooks.make().execute();
  if (allBooks.count) {
    await BookModel.batchDelete(allBooks.map((book) => book.id));
  }
});

test("GetBookById returns book when id matches", async () => {
  const createBookObject: CreateBookObject = {
    title: "Test GetBookById Book",
    author: "Test author",
  };

  const book = await CreateBook.make(createBookObject).execute();

  const getBookByIdResult = await GetBookById.make(book.id).execute();

  expect(getBookByIdResult.id).toBe(book.id);
  expect(getBookByIdResult.title).toBe(book.title);
  expect(getBookByIdResult.author).toBe(book.author);
  expect(getBookByIdResult.createdAt).toBe(new Date(book.createdAt));
  expect(getBookByIdResult.updatedAt).toBe(new Date(book.updatedAt));
});
