import express from 'express';
import serverless from 'serverless-http';

const app = express();

app.use((req, res, next) => {
  return res.status(200).json({
    message: "success"
  });
});

export const server = serverless(app);
