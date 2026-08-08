import app from "./app";
import mongoose from "mongoose";
import env from "./util/validateEnv";

const PORT = env.PORT;
const MONGO_URI = env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    dbName: "MondoDB_TS", //database name
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connected");

    // listen to port 8080
    app.listen(PORT, () => {
      console.log(`server running on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
