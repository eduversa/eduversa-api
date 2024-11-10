const { RoutineController } = require("../controllers");
const BaseRouter = require("./BASE.router");
class RoutineRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      res.send("This Router is Working");
    });

    // Route - /
    this.router.get("/", RoutineController.getRoutine);
    this.router.post("/", RoutineController.createNewRoutine);
    this.router.put("/", RoutineController.updateRoutine);
    this.router.delete("/", RoutineController.deleteRoutine);

    // Route - /available-data
    this.router.get("/available-data", RoutineController.getAvailableData);
    return this;
  }
}
module.exports = RoutineRouter;
