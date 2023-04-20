import * as dynamoose from "dynamoose";
import TableNames from "../config/tableNames";
import { Item } from "dynamoose/dist/Item";
import Validator from "validatorjs";

export class Book extends Item {
  id: string;
  title: string;
  author: string;
  comments?: string[];
  bookFinishedDate?: Date;
}
const bookSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      schema: [String],
      required: false,
    },
    bookFinishedDate: {
      type: Date,
      required: false,
    },
  },
  {
    validate: (object: object) => {
      const rules: object = {
        author: "required|string",
        title: "required|string",
        bookFinishedDate: "date",
        comments: "array",
      };

      const validation: Validator = new Validator(object, rules);

      if (validation.passes()) {
        return true;
      } else {
        //TODO: pass through failed validation errors
        throw new Error(
          "Error creating a book- Object does not pass validation"
        );
      }
    },
    timestamps: true,
  }
);

export const BookModel = dynamoose.model<Book>(TableNames.BOOKS, bookSchema);

BookModel.serializer.add("bookSerializer", {
  modify: (serialized, original) => ({
    ...serialized,
    bookFinishedDate: original.bookFinishedDate
      ? new Date(original.bookFinishedDate).toLocaleDateString()
      : null,
  }),
});

BookModel.serializer.default.set("bookSerializer");
