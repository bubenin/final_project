const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const purchaseSchema = Schema({
  text: String,
  date: String,
  price: Number,
});

// export model Purchase(покупки)
module.exports = Purchase = mongoose.model("Purchases", purchaseSchema);
