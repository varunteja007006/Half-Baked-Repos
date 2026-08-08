//Import and export mongoose
const { default: mongoose } = require("mongoose");
const Sample = require("../models/sampleModel");

//get all samples
const getSamples = async (req, res) => {
  const query = req.query;

  let filter = {};

  // if startDate and endDate query exists
  if (query.startDate || query.endDate) {
    const today = new Date();
    let fromDate = new Date(query.startDate);
    let toDate = new Date(query.endDate);

    // toDate time is only modified to current time
    toDate.setHours(today.getHours(), today.getMinutes(), today.getSeconds());

    if (query.startDate == query.endDate) {
      toDate.setHours(toDate.getHours() + 24);
    }

    if (!query.startDate) {
      fromDate.setFullYear(1900, 1, 1); // (year, month[0-11], day[1-31])
    }

    if (!query.endDate) {
      toDate = new Date(); // (year, month[0-11], day[1-31])
    }

    filter = {
      ...filter,
      createdAt: {
        $gte: fromDate,
        $lt: toDate,
      },
    };
  }

  /* mongoDB query: db.collection.find().sort({someSort:-1, someSort2: 1}) */
  let sort = { someSort: query.sort };

  const samples = await Sample.find(filter)
    .skip(query.skip)
    .limit(query.limit)
    .sort(sort);
  if (samples) {
    return res.status(200).json(samples);
  } else {
    return res.status(400).json({
      error: "Something went wrong. Unable to fetch data from server",
    });
  }
};

//get single sample
const getSample = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such sample" });
  }
  const sample = await Sample.findById(id);
  if (!sample) {
    return res.status(404).json({ error: "no such sample" });
  }
  res.status(200).json(sample);
};

//create a new sample
const createSample = async (req, res) => {
  const data = req.body;
  //add doc to DB
  try {
    const sample = await Sample.create(data);
    res.status(200).json(sample);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a sample
const deleteSample = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such sample" });
  }
  const sample = await Sample.findOneAndDelete({ _id: id });
  if (!sample) {
    return res.status(404).json({ error: "no such sample" });
  }
  res.status(200).json(sample);
};

//update a sample
const updateSample = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such sample" });
  }
  //pass two objects into findOneAndUpdate , find criteria & which has to be updated
  const sample = await Sample.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!sample) {
    return res.status(404).json({ error: "no such sample" });
  }
  res.status(200).json(sample);
};

//export the actions
module.exports = {
  createSample,
  getSamples,
  getSample,
  deleteSample,
  updateSample,
};
