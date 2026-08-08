//Import Mongoose
const mongoose = require("mongoose");
//Get Schema from mongoose
const Schema = mongoose.Schema;

//Create the model using Schema
const sampleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sample", sampleSchema);
