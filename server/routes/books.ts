import { Router } from "express";
import { Request, Response } from "express";
import { BookModel } from "../models/book";
export const bookRoutes: Router = Router();

bookRoutes.get("/", async (req: Request, res: Response) => {
  return res.send(await BookModel.scan().exec());
});

bookRoutes.get("/:id", async (req: Request, res: Response) => {
  const book = await BookModel.get(req.params.id);
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ error: "Error: book not found" });
  }
});

bookRoutes.delete("/:id", async (req: Request, res: Response) => {
  const book = await BookModel.get(req.params.id);
  if (book) {
    try {
      await book.delete();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).send({ error });
    }
  } else {
    return res.status(404).json({ error: "Error: book not found" });
  }
});

bookRoutes.get("/test", async (req: Request, res: Response) => {
  await BookModel.create({
    id: Date.now() + "test",
    title: "test",
    author: "test author",
  });

  res.send("Created");
});
