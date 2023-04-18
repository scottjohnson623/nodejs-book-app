import { Book } from "../../models/book.model";

export class DeleteBook {
  _book: Book;

  constructor(book: Book) {
    this._book = book;
  }

  static make(book: Book): DeleteBook {
    return new DeleteBook(book);
  }

  execute(): Promise<void> {
    return this._book.delete();
  }
}
