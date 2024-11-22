const mongoose = require("mongoose");

// Use Later
const collegeSchema = mongoose.Schema({
  college_name: {
    type: String,
    required: true,
  },
  college_id: {
    type: String,
    required: true,
  },
  college_address: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
  college_contact: {
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  college_courses: [
    {
      code: {
        type: String,
      },
      name: {
        type: String,
      },
      fees: {
        type: Number,
      },
      streams: [
        {
          name: {
            type: String,
          },
          number_of_seats: {
            type: Number,
          },
        },
      ],
      duration: {
        type: Number,
      },
      total_sem: {
        type: String,
      },
      total_seats: {
        type: Number,
      },
    },
  ],
});

const CollegeModel = mongoose.model("college-data", collegeSchema);

module.exports = CollegeModel;
