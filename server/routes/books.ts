import { Router } from "express";
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  testCreateEndpoint,
} from "../controllers/book.controller";
export const bookRoutes: Router = Router();

bookRoutes.get("/", getAllBooks);

bookRoutes.get("/test", testCreateEndpoint);

bookRoutes.get("/:id", getBookById);

bookRoutes.delete("/:id", deleteBookById);

bookRoutes.post("/", createBook);
