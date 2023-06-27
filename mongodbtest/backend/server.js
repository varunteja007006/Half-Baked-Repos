//to load the env variables
require("dotenv").config();
//Import express App
const express = require("express");
//Import mongoose to communicate with mongo db
const mongoose = require("mongoose");
//Import CORS
const cors = require("cors");
//Import routes
const sampleRoutes = require("./routes/sampleRoutes");

//Express app
const app = express();

//use middleware
app.use(express.json());

// Middleware to console log the req path, method
// Useful for troubleshooting
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

//To avoid CORS error
app.use(cors());

//Add routes
app.use("/api/samples", sampleRoutes);

//connect to Mongo DB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "sampleDB", //database name
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
    //listen for requests on the port
    app.listen(process.env.PORT, () => {
      console.log("Running on port : ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
