const { RoomController } = require("../../controllers");
const BaseRouter = require("../BASE.router");

class RoomRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      res.send("This Router is Working");
    });

    // Route - /
    this.router.get("/", RoomController.readOneRoom);
    this.router.post("/", RoomController.createNewRoom);
    this.router.put("/", RoomController.updateOneRoom);
    this.router.delete("/", RoomController.deleteOneRoom);

    // Route - /all
    this.router.get("/all", RoomController.readAllRooms);
    this.router.delete("/all", RoomController.deleteAllRooms);
    return this;
  }
}
module.exports = RoomRouter;
