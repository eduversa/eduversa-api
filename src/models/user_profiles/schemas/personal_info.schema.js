const mongoose = require("mongoose");

const personalInfoSchema = mongoose.Schema({
  first_name: { type: String },
  middle_name: { type: String },
  last_name: { type: String },
  gender: { type: String },
  dob: { type: Date },
  present_address: {
    street: { type: String },
    pincode: { type: String },
    city: { type: String },
    district: { type: String },
    state: { type: String },
  },
  permanent_address: {
    street: { type: String },
    pincode: { type: String },
    city: { type: String },
    district: { type: String },
    state: { type: String },
  },
  are_addresses_same: { type: Boolean, default: false },
  email: { type: String },
  contact: { type: String },
  category: { type: String },
  blood_group: { type: String },
  aadhar_number: { type: String },
  pan_number: { type: String },
});

module.exports = personalInfoSchema;
