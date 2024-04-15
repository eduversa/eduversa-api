const { PrismLogger } = require("prism-logger");
const Scanner = require("../classes/scanner.class");

const processScannedQR = async (req, res) => {
  try {
    console.log("processing");
    console.log(req.body);
    const scanner = new Scanner(req.body);
    await scanner.processInput(req, res);
  } catch (error) {
    PrismLogger.error("Error in processScannedQR");
    PrismLogger.error(error);
    res.send({ status: false, message: error.message });
  }
};

module.exports = { processScannedQR };
