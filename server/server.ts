import express from "express";
import { Express, Request, Response } from "express";
import { apiRoutes } from "./routes/api";
import serverless, { Handler } from "serverless-http";

const app: Express = express();

app.use("/api", apiRoutes);

app.get("*", (req: Request, res: Response) => {
  return res.status(404).json({ message: "Error - Not Found" });
});

export const handler: Handler = serverless(app);
