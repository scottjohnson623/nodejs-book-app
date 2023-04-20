import * as dynamoose from "dynamoose";
import { CreateBook, CreateBookObject } from "./createBook";
import { GetAllBooks } from "./getAllBooks";
import { Book, BookModel } from "../../models/book.model";

dynamoose.aws.ddb.local("http://localhost:3004");

afterEach(async () => {
  const allBooks = await GetAllBooks.make().execute();
  if (allBooks.count) {
    await BookModel.batchDelete(allBooks.map((book) => book.id));
  }
});

test("CreateBook with no date should succeed", async () => {
  const bookObjectNoDate: CreateBookObject = {
    title: "Test CreateBook book",
    author: "Test author",
  };
  const book: Book = await CreateBook.make(bookObjectNoDate).execute();
  expect(book).toHaveProperty("id");
  expect(book).toHaveProperty("title");
  expect(book).toHaveProperty("author");
  expect(book).toHaveProperty("comments");
  expect(book).toHaveProperty("createdAt");
  expect(book).toHaveProperty("updatedAt");
  expect(book.title).toBe("Test CreateBook book");
  expect(book.author).toBe("Test author");
  expect(book.bookFinishedDate).toBeUndefined();
  expect(book.comments).toEqual([]);
});

test("CreateBook with date should succeed", async () => {
  const date = new Date("2022-03-05");

  const bookObjectNoDate: CreateBookObject = {
    title: "Test CreateBook book 2",
    author: "Test author2",
    bookFinishedDate: date,
  };
  const book: Book = await CreateBook.make(bookObjectNoDate).execute();
  expect(book).toHaveProperty("id");
  expect(book).toHaveProperty("title");
  expect(book).toHaveProperty("author");
  expect(book).toHaveProperty("comments");
  expect(book).toHaveProperty("createdAt");
  expect(book).toHaveProperty("updatedAt");
  expect(book.title).toBe("Test CreateBook book 2");
  expect(book.author).toBe("Test author2");
  expect(book.bookFinishedDate).toBe(date.valueOf());
  expect(book.comments).toEqual([]);
});
