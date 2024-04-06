const express = require("express");
const { processScannedQR } = require("../controllers/scanner.controllers");

const scannerRouter = express.Router();

scannerRouter.get("/", (req, res) => {
  res.send("This Router is working");
});

scannerRouter.route("/process").post(processScannedQR);

module.exports = scannerRouter;
