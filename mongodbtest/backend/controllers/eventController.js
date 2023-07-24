const { default: mongoose } = require("mongoose");
const Event = require("../models/eventModel");

//get all Events
const getEvents = async (req, res) => {
  const events = await Event.find({});
  if (events) {
    return res.status(200).json(events);
  }
};

const getEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Event" });
  }
  const event = await Event.findById(id);
  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }
  res.status(200).json(event);
};

//create a new Event
const createEvent = async (req, res) => {
  const { eventName, startDate, endDate, team1, team2 } = req.body;
  //add doc to DB
  try {
    const event = await Event.create({
      eventName,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      team1,
      team2,
      status: true,
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//export the actions
module.exports = {
  getEvents,
  createEvent,
  getEvent,
};
