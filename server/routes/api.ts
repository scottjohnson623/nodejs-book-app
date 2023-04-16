import { Router } from "express";
import { bookRoutes } from "./books";

export const apiRoutes: Router = Router();

apiRoutes.use("/books", bookRoutes);
