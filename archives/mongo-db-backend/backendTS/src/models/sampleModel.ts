import mongoose, { InferSchemaType, Schema } from "mongoose";

const sampleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },

    // Date and time types
    date: { type: Date },
    time: { type: Date },
    timestamp: { type: Date, default: Date.now },

    // Binary data
    binary: {
      type: Buffer,
    },

    // Arrays
    fav: { type: [String] },
    numbers: { type: [Number] },
    booleans: { type: [Boolean] },
    dates: { type: [Date] },
    timestamps: { type: [Date] },
    binaries: { type: [Buffer] },

    // Mixed data
    mixed: { type: Schema.Types.Mixed, required: true },

    // ObjectIds
    objectId: { type: Schema.Types.ObjectId, required: true },

    // Nested objects
    nestedObject: {
      type: { type: String, required: true },
      value: { type: Schema.Types.Mixed, required: true },
    },

    // Decimal128
    decimal128: { type: Schema.Types.Decimal128, required: true },
  },
  {
    timestamps: true,
  }
);

type sampleSchemaType = InferSchemaType<typeof sampleSchema>;

const sampleModel = mongoose.model<sampleSchemaType>(
  "sampleSchema",
  sampleSchema
);

export { sampleModel };

/*
This schema demonstrates all the data types that Mongoose supports:

Basic types: String, Number, Boolean
Date and time types: Date, Time, Timestamp
Binary data: Buffer
Arrays: Arrays of any supported type
Nested objects: Objects containing other types
ObjectIds: References to other documents in the database
Mixed data: Any type of data
Decimal128: High precision decimal values

*/

// Sample input data
/*
const sampleData = {
  name: "Abhi",
  age: 12,
  active: true,

  date: new Date(2023, 11, 9), // December 9, 2023
  time: new Date(2023, 11, 9, 15, 54), // 3:54 PM on December 9, 2023
  timestamp: Date.now(),

  binary: new Buffer.from("This is binary data.", "utf-8"),

  strings: ["String 1", "String 2", "String 3"],
  numbers: [1, 2, 3],
  booleans: [true, false, true],
  dates: [new Date(2023, 10, 31), new Date(2023, 11, 1), new Date(2023, 11, 2)],
  timestamps: [Date.now(), Date.now() + 1000, Date.now() + 2000],
  binaries: [
    new Buffer.from("Binary data 1", "utf-8"),
    new Buffer.from("Binary data 2", "utf-8"),
    new Buffer.from("Binary data 3", "utf-8"),
  ],
  
  mixed: {
    name: "Mixed object",
    data: [1, "string", true],
  },
  
  objectId: new mongoose.Types.ObjectId(), // Generate a random ObjectId

  nestedObject: {
    type: "Example",
    value: {
      name: "John Doe",
      age: 30,
    },
  },

  decimal128: new mongoose.Types.Decimal128("1234567890.1234567890"),
};


*/
