const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema(
  {
    //yellow-u// Define the Schema Here
    name: {
        type: String,
        unique: true
    },
    code: {
        type: String,
        unique: true
    },
    desc: {
        type: String
    },
  },
  {
    //yellow-u// Options like Timestamps Ho Here
    timestamps: true
  }
);

const PermissionsCollection = mongoose.model("permission-data", permissionSchema);

module.exports = PermissionsCollection;
