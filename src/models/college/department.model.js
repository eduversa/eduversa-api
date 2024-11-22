const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  streams: [{ name: { type: String, required: true } }],
  course_id: { type: String, required: true },
  hod: { type: String, required: true },
});

const DepartmentModel = mongoose.model("department-data", departmentSchema);
module.exports = DepartmentModel;
