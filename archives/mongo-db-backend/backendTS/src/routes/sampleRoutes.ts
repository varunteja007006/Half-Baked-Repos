import express from "express";
import { getAllSamples } from "../controller/sampleController";

const router = express.Router();

router.get("/", getAllSamples);

router.post("/");

router.get("/:id");

router.delete("/:id");

router.patch("/:id");

export { router };
