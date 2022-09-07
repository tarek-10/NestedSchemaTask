const express = require("express");
const connection = require("./configration/Db.config");
const { userRouter, postRouter, comentRouter, replayRouter } = require("./router/app.router");
const app = express();
require("dotenv").config();

const port = process.env.PORT;

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(userRouter, postRouter, comentRouter ,replayRouter);
connection();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
