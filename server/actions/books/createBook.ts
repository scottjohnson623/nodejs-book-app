import { Book, BookModel } from "../../models/book.model";
import Validator from "validatorjs";

export class CreateBook {
  _data: object;

  constructor(data: object) {
    this._data = data;
  }

  static make(data: object): CreateBook {
    return new CreateBook(data);
  }

  execute(): Promise<Book> {
    const rules: object = {
      author: "required|string",
      title: "required|string",
      bookFinishedDate: "date",
      comments: "array",
    };

    const validation: Validator = new Validator(this._data, rules);

    if (validation.passes()) {
      return BookModel.create({
        id: Date.now() + this._data.title,
        ...this._data,
      });
    } else {
      //TODO: pass through failed validation errors
      throw new Error("Error creating a book- Object does not pass validation");
    }
  }
}
