import dynamoose from "dynamoose";
import TableNames from "../config/tableNames";
const { Schema } = dynamoose;
import { Item } from "dynamoose/dist/Item";

class Book extends Item {
  id: string;
  title: string;
  author: string;
  comments: string[];
  bookFinishedDate: string | null;
}

const bookSchema = new Schema(
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
      type: [String],
      required: false,
    },
    bookFinishedDate: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const BookModel = dynamoose.model<Book>(TableNames.BOOKS, bookSchema);
