const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const apiRoute = require("./route/routes");

app.use(cors());

app.use(bodyParser.json());

const uri ="mongodb+srv://Andrey:qwerty123@cluster1.pvqrt.mongodb.net/PurchasesDB?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/", apiRoute);

app.listen(8000, () => {
  console.log("app listening on port 8000");
});
