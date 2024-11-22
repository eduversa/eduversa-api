const { default: mongoose } = require("mongoose");

const roomSchema = mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String },
  building: { type: String },
  type: { type: String },
  capacity: { type: Number },
  //   isClass: { type: Boolean },
});

const RoomModel = mongoose.model("room-data", roomSchema);
module.exports = RoomModel;
