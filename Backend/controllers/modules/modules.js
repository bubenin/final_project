const Purchase = require("../newPurchases/newPurchases");

//все задачи
module.exports.getallPurchases = (req, res) => {
  Purchase.find().then((result) => res.send(result));
};
//создание задачи
module.exports.createPurchases = (req, res) => {
  const body = req.body;
  const dayDate = new Date();
  const createDate = `${dayDate.getDate()}.${dayDate.getMonth()}.${dayDate.getFullYear()}`;
  if (body.hasOwnProperty("text") && body.hasOwnProperty("price")) {
    Purchase.create({
      text: body.text,
      date: createDate,
      price: body.price,
    }).then((_result) => {
      Purchase.find().then((result) => res.send(result));
    });
  } else {
    res.status(400).send("Uncorrect body");
  }
};
//изменение задачи
module.exports.updatePurchases = (req, res) => {
  const body = req.body;
  if (body.hasOwnProperty("_id") &&(body.hasOwnProperty("text") || body.hasOwnProperty("price"))){
    Purchase.updateOne(
      { _id: body._id },
      { text: body.text, price: body.price }
    ).then((_result) => {
      Purchase.find().then((result) => res.send(result));
    });
  } else {
    res.status(400).send("Uncorrect body");
  }
};
//удаление задачи
module.exports.deletePurchases = (req, res) => {
  const body = req.body;
  if (body.hasOwnProperty("_id")) {
    Purchase.deleteOne({ _id: body._id }).then((_result) => {
      Purchase.find().then((result) => res.send(result));
    });
  } else {
    res.status(400).send("Uncorrect id");
  }
};
