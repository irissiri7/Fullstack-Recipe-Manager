import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

//Database
import db from "./src/firebase/adminSetUp.js";

//Configurations
dotenv.config();
const PORT = process.env.PORT;

//Creating the server
const app = express();

//Apply middleware packages
app.use(helmet());
app.use(morgan("common"));

//Test route
app.get("/", async (req, res, next) => {
  const testRef = db.collection("recipes").doc("test");
  const doc = await testRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
  }

  res.send("<h1>Hello world!</h1>");
});

//Kick off
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
