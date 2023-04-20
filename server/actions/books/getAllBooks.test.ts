import * as dynamoose from "dynamoose";
import { CreateBook, CreateBookObject } from "./createBook";
import { GetAllBooks } from "./getAllBooks";
import { BookModel } from "../../models/book.model";

dynamoose.aws.ddb.local("http://localhost:3004");

afterEach(async () => {
  const allBooks = await GetAllBooks.make().execute();
  if (allBooks.count) {
    await BookModel.batchDelete(allBooks.map((book) => book.id));
  }
});

test("GetAllBooks returns no books when no books exist", async () => {
  const allBooks = await GetAllBooks.make().execute();
  expect(allBooks.count).toBe(0);
});

test("GetAllBooks returns books when books exist", async () => {
  const book: CreateBookObject = {
    title: "Test GetAllItems Book",
    author: "Test author",
  };
  let allBooks = await GetAllBooks.make().execute();
  await CreateBook.make(book).execute();
  allBooks = await GetAllBooks.make().execute();

  expect(allBooks.count).toBe(1);
});
