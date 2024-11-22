const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    security_token: {
      type: String,
    },
    permissions: [
      {
        type: String,
      },
    ],
    first_name: {
      type: String,
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    user_id: {
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    type: {
      type: String,
      default: "applicant",
    },
    access_level: {
      type: Number,
      default: 1,
    },
    tokens: [
      {
        token: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AccountModel = mongoose.model("account-data", accountSchema);

module.exports = AccountModel;
