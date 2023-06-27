const express = require("express");
const {
  createSample,
  getSamples,
  getSample,
  deleteSample,
  updateSample,
} = require("../controllers/sampleController");

//express router
const router = express.Router();

//get all Samples
router.get("/", getSamples);

//get a single Sample
router.get("/:id", getSample);

//post a new Sample
router.post("/", createSample);

//delete a Sample
router.delete("/:id", deleteSample);

//Update a Sample
router.patch("/:id", updateSample);

module.exports = router;
