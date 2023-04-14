import express, { Express, Request, Response } from 'express';
import serverless, { Handler } from 'serverless-http';

const app: Express = express();

app.use((req: Request, res: Response) => {
  return res.status(200).json({
    message: "success"
  });
});

export const handler: Handler = serverless(app);
