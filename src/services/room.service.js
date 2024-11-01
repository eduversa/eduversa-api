const { RoomRepository } = require("../repositories");

class RoomService {
  static createNewRoom = async (data) => {
    try {
      const existingRoom = await new RoomRepository().mustNotExist(data);
      const room = new RoomRepository.Builder(data).build();
      await room.create();
      return room;
    } catch (error) {
      console.log("Error - SubjectService - createSubjectUsingData");
      throw error;
    }
  };
  static updateRoom = async (id, data) => {
    try {
      const existingRoom = await new RoomRepository().mustExist({ id });
      const room = new RoomRepository.Builder(existingRoom)
        .setData(data)
        .build();
      await room.update({ id: existingRoom.id });
      return room;
    } catch (error) {
      console.log("Error - SubjectService - updateRoom");
      throw error;
    }
  };
  static getOneRoom = async (id) => {
    try {
      const room = await new RoomRepository().mustExist({ id });
      return room;
    } catch (error) {
      console.log("Error - SubjectService - getOneRoom");
      throw error;
    }
  };
  static deleteOneRoom = async (id) => {
    try {
      const existingRoom = await new RoomRepository().mustExist({ id });
      await existingRoom.delete();
      return existingRoom;
    } catch (error) {
      console.log("Error - SubjectService - deleteOneRoom");
      throw error;
    }
  };
}

module.exports = RoomService;
