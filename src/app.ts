import express, { Application, Request, Response, json } from "express";
import cors from "cors";
const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

// testing
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
