const express = require("express");
const {
  createEvent,
  getEvents,
  getEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", createEvent);

module.exports = router;
