const express = require("express");
const router = express.Router();

const {
  getallPurchases,
  createPurchases,
  updatePurchases,
  deletePurchases,
} = require("../controllers/modules/modules");

router.get("/allPurchases", getallPurchases);
router.post("/createPurchases", createPurchases);
router.patch("/updatePurchases", updatePurchases);
router.delete("/deletePurchases", deletePurchases);

module.exports = router;
