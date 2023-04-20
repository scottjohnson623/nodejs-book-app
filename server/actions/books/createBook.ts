import { Book, BookModel } from "../../models/book.model";

export interface CreateBookObject {
  id?: string;
  title: string;
  author: string;
  comments?: string[];
  bookFinishedDate?: Date;
}

export class CreateBook {
  _data: CreateBookObject;

  constructor(data: CreateBookObject) {
    this._data = data;
  }

  static make(data: CreateBookObject): CreateBook {
    return new CreateBook(data);
  }

  execute(): Promise<Book> {
    if (!this._data.id) {
      this._data.id = Date.now() + this._data.title;
    }
    if (this._data.bookFinishedDate) {
      this._data.bookFinishedDate = new Date(this._data.bookFinishedDate);
    } else {
      delete this._data.bookFinishedDate;
    }
    if (!this._data.comments) {
      this._data.comments = [];
    }
    return BookModel.create(this._data);
  }
}
