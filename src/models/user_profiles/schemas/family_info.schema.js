const mongoose = require("mongoose");

const familyInfoSchema = mongoose.Schema({
  father: {
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    contact: { type: String },
  },
  mother: {
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    contact: { type: String },
  },
  guardian: {
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    relation: { type: String },
    office_address: {
      street: { type: String },
      pincode: { type: String },
      city: { type: String },
      district: { type: String },
      state: { type: String },
    },
    occupation: { type: String },
    designation: { type: String },
    office_contact: { type: String },
    contact: { type: String },
    income: { type: String },
    email: { type: String },
    pan_number: { type: String },
    aadhar_number: { type: String },
  },
});
module.exports = familyInfoSchema;
