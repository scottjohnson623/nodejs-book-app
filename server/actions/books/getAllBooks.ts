import { BookModel } from "../../models/book.model";

export class GetAllBooks {
  static make(): GetAllBooks {
    return new GetAllBooks();
  }

  execute() {
    return BookModel.scan().exec();
  }
}
