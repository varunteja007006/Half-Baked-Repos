const express = require("express");
const {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.get("/:id", getEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
