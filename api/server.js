import colors from "colors";
import mongoDBConnection from "./config/mongoDB.js";
import app from "./app.js";
import { PORT } from "./utils/secret.js";

app.listen(PORT, () => {
  // connect mongo DB connection
  mongoDBConnection();
  // log server running status
  console.log(`Server Is Running on port ${PORT}`.bgGreen.black);
});
