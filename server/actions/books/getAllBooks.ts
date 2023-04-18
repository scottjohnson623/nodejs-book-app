import { Book, BookModel } from "../../models/book.model";

export class GetAllBooks {
  static make(): GetAllBooks {
    return new GetAllBooks();
  }

  execute(): Promise<Book[]> {
    return BookModel.scan().exec();
  }
}
