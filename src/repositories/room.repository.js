const { Generator } = require("../helpers");
const { RoomModel } = require("../models");

class RoomRepository {
  id = null;
  name = null;
  building = null;
  // isClass = null;
  type = null;
  capacity = null;

  constructor(builder) {
    if (builder && typeof builder) {
      this.setData(builder);
    }
  }

  setData(data) {
    const { id, name, building, type, capacity } = data;
    if (id) {
      this.id = id;
    }
    if (name) {
      this.name = name;
    }
    if (building) {
      this.building = building;
    }
    if (type) {
      this.type = type;
    }
    if (capacity) {
      this.capacity = capacity;
    }
    return this;
  }

  create = async () => {
    try {
      const room = await new RoomModel(this).save();
      console.log("Created Room Successfully");
      this.setData(room);
      return this;
    } catch (error) {
      console.log("Error - RoomRepository - Create");
      throw error;
    }
  };

  readMultiple = async (query) => {
    try {
      const rooms = await RoomModel.find(query);
      if (!rooms || rooms.length == 0) {
        throw new Error("rooms Not Found");
      }
      return rooms;
    } catch (error) {
      console.log("Error - roomRepository - readMultiple");
      throw error;
    }
  };
  mustExist = async (query) => {
    try {
      const room = await RoomModel.findOne(query);
      if (!room) {
        throw new Error("room Not Found");
      }
      this.setData(room);
      return this;
    } catch (error) {
      console.log("Error - roomRepository - MustExist");
      throw error;
    }
  };
  mustNotExist = async (query) => {
    try {
      const room = await RoomModel.findOne(query);
      if (room) {
        throw new Error("room Already Exists");
      }
      return this;
    } catch (error) {
      console.log("Error - roomRepository - MustNotExist");
      throw error;
    }
  };
  delete = async () => {
    try {
      const room = await RoomModel.findOneAndDelete({
        id: this.id,
      });
      console.log("Deleted room Successfully");
      console.log(room);
      this.setData(room);
      return this;
    } catch (error) {
      console.log("Error - roomRepository - Delete");
      throw error;
    }
  };
  deleteMultiple = async (query) => {
    try {
      const rooms = await RoomModel.deleteMany(query);
      if (!rooms || rooms.deletedCount == 0) {
        throw new Error("rooms Not Found");
      }
      return rooms;
    } catch (error) {
      console.log("Error - roomRepository - deleteMultiple");
      throw error;
    }
  };
  update = async (query) => {
    try {
      const room = await RoomModel.findOneAndUpdate(query, this, {
        new: true,
      });
      console.log("Updated room Successfully");
      this.setData(room);
      return this;
    } catch (error) {
      console.log("Error - roomRepository - Update");
      throw error;
    }
  };
  static Builder = class {
    id = null;
    name = null;
    building = null;
    // isClass = null;
    type = null;
    capacity = null;

    constructor(data) {
      this.setDefaultData();
      if (data && typeof data) {
        this.setData(data);
      }
    }

    setData(data) {
      const { id, name, building, type, capacity } = data;
      if (id) {
        this.setId(id);
      }
      if (name) {
        this.setName(name);
      }
      if (building) {
        this.setBuilding(building);
      }
      if (type) {
        this.setType(type);
      }
      if (capacity) {
        this.setCapacity(capacity);
      }
      return this;
    }

    setDefaultData() {
      this.setId(Generator.getRoomId());
      return this;
    }

    setId(id) {
      this.id = id;
      return this;
    }
    setName(name) {
      this.name = name;
      return this;
    }
    setBuilding(building) {
      this.building = building;
      return this;
    }
    // setIsClass(id) {
    //   this.id = id;
    //   return this;
    // }
    setType(type) {
      this.type = type;
      return this;
    }
    setCapacity(capacity) {
      this.capacity = capacity;
      return this;
    }

    build() {
      return new RoomRepository(this);
    }
  };
}
module.exports = RoomRepository;
