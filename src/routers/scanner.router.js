const ScannerController = require("../controllers/scanner.controller");
const BaseRouter = require("./BASE.router");
class ScannerRouter extends BaseRouter {
  configure() {
    this.router.get("/", (req, res) => {
      res.send("This Router is working");
    });

    this.router.get("/process", ScannerController.processScannedQR);
    return this;
  }
}

module.exports = ScannerRouter;
