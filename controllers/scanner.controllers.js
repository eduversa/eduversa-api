const { PrismLogger } = require("prism-logger");
const Scanner = require("../classes/scanner.class");

const processScannedQR = async (req, res) => {
  try {
    console.log("processing");
    const scanner = new Scanner(req.body);
    scanner.processInput();
  } catch (error) {
    PrismLogger.error("Error in processScannedQR");
    PrismLogger.error(error);
    res.send({ status: false, message: error.message });
  }
};

module.exports = { processScannedQR };
