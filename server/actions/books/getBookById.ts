import { Book, BookModel } from "../../models/book.model";

export class GetBookById {
    _id: string

    constructor(id: string) {
        this._id = id
    }

    static make(id: string): GetBookById {
        return new GetBookById(id);
    }

    execute(): Promise<Book|undefined> {
        return BookModel.get(this._id);
    }
}