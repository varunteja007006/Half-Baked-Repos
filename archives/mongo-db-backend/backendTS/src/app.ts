import "dotenv/config";
import express from "express";
import { router as sampleRouter } from "./routes/sampleRoutes";
import morgan from "morgan";
import createHttpError from "http-errors";
import cors from "cors"

const app = express();

app.use(morgan("dev"));

// to parse the json body
app.use(express.json());

//To avoid CORS error
app.use(cors());

app.use("/api/sample", sampleRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "End-point not found"));
});

export default app;
