const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

const startApp = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log("Db connected");
      })
      .catch((error) => {
        console.log("Db error", error);
      });
    app.listen(process.env.PORT, () => {
      console.log("Сервер воркает");
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
