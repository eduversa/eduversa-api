const mongoose = require("mongoose");

// const Schema = mongoose.Schema(
//   {
//     //yellow-u// Define the Schema Here
//   },
//   {
//     //yellow-u// Options like Timestamps Ho Here
//   }
// );

// red-f// Personal Info
const personalInfoSchema = {
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
};

// red-f// Academic Info
const academicInfoSchema = {
  admission: {
    exam_name: { type: String },
    year_of_exam: { type: String },
    roll_number: { type: String },
    rank: { type: String },
  },
  secondary: {
    exam_name: { type: String },
    year_of_exam: { type: String },
    board: { type: String },
    aggregate: { type: String },
    school_name: { type: String },
    subjectString: { type: String },
    subjects: String,
    marks: Object,
  },
  higher_secondary: {
    exam_name: { type: String },
    year_of_exam: { type: String },
    board: { type: String },
    aggregate: { type: String },
    school_name: { type: String },
    subjectString: { type: String },
    subjects: String,
    marks: Object,
  },
};

// red-f// Family Info
const familyInfoSchema = {
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
};

// red-f// Applicant Course Info
const applicantCourseSchema = {
  course_name: { type: String },
  duration: { type: String },
  stream: { type: String },
  admission_year: { type: String, default: new Date().getFullYear() },
  //   enrollment_number: { type: String },
};
// red-f// Student Course Info
// const CourseInfoCollection = mongoose.model("course-data", courseInfoSchema)
const studentCourseInfo = {
  course_name: { type: String },
  duration: { type: String },
  section: { type: String },
  stream: { type: String },
  total_sem: { type: String },
  currrent_sem: { type: String },
  current_year: { type: String },
  admission_year: { type: String },
  passout_year: { type: String },
  enrollment_number: { type: String },
  registration_number: { type: String },
  //   grades: [
  //     {
  //       semester: { type: String},
  //       marks: [
  //         {
  //           subject: { type: String},
  //           subject_code: { type: String},
  //           letter_grading: { type: String},
  //           points: { type: String},
  //           credits: { type: String},
  //           credit_points: { type: String},
  //           total_classes: { type: String},
  //           attendend_classes: { type: String},
  //           attendance: { type: String},
  //         },
  //       ],
  //       total_credits: { type: String},
  //       total_credit_points: { type: String},
  //       sgpa: { type: String},
  //     },
  //   ],
};

//orange-f// Applicant Schema and Model
const applicantSchema = mongoose.Schema(
  {
    image: { type: String },
    user_id: { type: String },
    personal_info: personalInfoSchema,
    academic_info: academicInfoSchema,
    family_info: familyInfoSchema,
    course_info: applicantCourseSchema,
  },
  {
    timestamps: true,
  }
);
const ApplicantCollection = mongoose.model("applicant-data", applicantSchema);

//orange-f// Student Schema and Model
const studentSchema = mongoose.Schema(
  {
    image: { type: String },
    user_id: { type: String },
    personal_info: personalInfoSchema,
    academic_info: academicInfoSchema,
    family_info: familyInfoSchema,
    course_info: studentCourseInfo,
  },
  {
    timestamps: true,
  }
);
const StudentCollection = mongoose.model("student-data", studentSchema);

module.exports = { ApplicantCollection, StudentCollection };
