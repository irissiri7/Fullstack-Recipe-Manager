import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

//Configurations
dotenv.config();
const PORT = process.env.PORT;

//Starting the app
const app = express();

//Apply middleware packages
app.use(helmet());
app.use(morgan("common"));

//Test route
app.get("/", (req, res, next) => {
  res.send("<h1>Hello world!</h1>");
});

//Kick off
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
