import * as dynamoose from "dynamoose";
import { Book } from "../../models/book.model";
import { CreateBook, CreateBookObject } from "./createBook";
import { GetAllBooks } from "./getAllBooks";
import { DeleteBook } from "./deleteBook";

dynamoose.aws.ddb.local("http://localhost:3004");

test("DeleteBook should succeed", async () => {
  const bookObject: CreateBookObject = {
    title: "Test DeleteBook book",
    author: "Test author",
  };
  const book: Book = await CreateBook.make(bookObject).execute();

  let allBooks = await GetAllBooks.make().execute();

  expect(allBooks.count).toBe(1);

  await DeleteBook.make(book).execute();

  allBooks = await GetAllBooks.make().execute();

  expect(allBooks.count).toBe(0);
});
