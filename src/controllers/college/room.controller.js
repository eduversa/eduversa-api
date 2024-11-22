const { Response } = require("../../helpers");
const { RoomService } = require("../../services");
class RoomController {
  static createNewRoom = async (req, res, next) => {
    try {
      const room = await RoomService.createNewRoom(req.body);
      new Response.Created(res).setMessage("Room Created").setData(room).send();
    } catch (error) {
      console.log("Error - RoomController - createNewRoom");
      next(error);
    }
  };
  static updateOneRoom = async (req, res, next) => {
    try {
      const id = req.query.room_id;
      const room = await RoomService.updateRoom(id, req.body);
      new Response.Ok(res)
        .setMessage("Update Room Successfully")
        .setData(room)
        .send();
    } catch (error) {
      console.log("Error - RoomController - updateOneRoom");
      next(error);
    }
  };
  static readOneRoom = async (req, res, next) => {
    try {
      const id = req.query.room_id;
      const room = await RoomService.getOneRoom(id);
      new Response.Ok(res)
        .setMessage("Found Room Successfully")
        .setData(room)
        .send();
    } catch (error) {
      console.log("Error - RoomController - readOneRoom");
      next(error);
    }
  };
  static deleteOneRoom = async (req, res, next) => {
    try {
      const id = req.query.room_id;
      const room = await RoomService.deleteOneRoom(id);
      new Response.Ok(res).setMessage("Deleted Room Successfully").send();
    } catch (error) {
      console.log("Error - RoomController - deleteOneRoom");
      next(error);
    }
  };
  static readAllRooms = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("No Implemented").send();
    } catch (error) {
      console.log("Error - RoomController - readAllRooms");
      next(error);
    }
  };
  static deleteAllRooms = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("No Implemented").send();
    } catch (error) {
      console.log("Error - RoomController - deleteAllRooms");
      next(error);
    }
  };
}
module.exports = RoomController;
