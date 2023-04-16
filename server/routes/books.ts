import { Router } from 'express';
import { Request, Response } from 'express';
import { BookModel } from '../models/book';
export const bookRoutes: Router = Router();

bookRoutes.get('/', async (req: Request, res: Response) => {
  res.send(await BookModel.scan().exec())
});

bookRoutes.get('/test', (req: Request, res: Response) => {
    BookModel.create({
        id: Date.now() + 'test',
        title: 'test',
        author: 'test author',
    });

    res.send("Created");
});