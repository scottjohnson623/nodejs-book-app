import express from "express";
import { Express, Request, Response } from "express";
import { apiRoutes } from "./routes/api";
import serverless, { Handler } from "serverless-http";
import dotenv from "dotenv";
import dynamoose from "dynamoose";

dotenv.config();

if (process.env.IS_OFFLINE) {
  dynamoose.aws.ddb.local("http://localhost:3004");
}

const app: Express = express();

app.use(express.json());

app.use("/api", apiRoutes);

app.get("*", (req: Request, res: Response) => {
  return res.status(404).json({ message: "Error - Not Found" });
});

export const handler: Handler = serverless(app);
