import { Request, RequestHandler, Response } from "express";
import { sampleModel as Sample } from "../models/sampleModel";
import { Error } from "mongoose";

const getAllSamples : RequestHandler = async (req: Request, res: Response) => {
  try {
    const samples = await Sample.find({});
    if (samples) {
      return res.status(200).json(samples);
    } else {
      throw new Error("Unable to fetch data");
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
};

export { getAllSamples };
