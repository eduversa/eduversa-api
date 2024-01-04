const mongoose = require("mongoose");
const { formatName } = require("../functions/account.functions");
const { ApplicantCollection } = require("../models/profile.models");
const {
  NotFoundError,
  FailedValidationError,
  BadRequestError,
  MissingValueError,
} = require("./errors/error.prototypes");
const {
  GENDERS,
  CATEGORY,
  BLOOD_GROUPS,
} = require("../functions/data/defaultOptions.data");
const validate = require("./valiator.class");

const formatAddress = (data) => {
  let object = {};
  if (data) {
    object.street = data.street;
    object.pincode = data.pincode;
    object.district = data.district;
    object.city = data.city;
    object.state = data.state;
  }

  return object;
};

const formatMarks = (subjectString) => {
  let subjectsArray = subjectString.split(",");
  let subjects = "",
    marks = {};
  subjectsArray.forEach((subject) => {
    subject = subject.split("-");
    let score = subject[1];
    subject = subject[0];

    subject = subject
      .split(" ")
      .filter((item) => item !== "")
      .join(" ");
    score = parseInt(
      score
        .split(" ")
        .filter((item) => item !== "")
        .join("")
    );
    subjects = subjects + subject;
    marks[subject] = score;
  });
  return { subjects, marks };

  // academic_info.secondary.subjects = subjects;
  // academic_info.secondary.marks = marks;
};

class Applicant {
  image = "";
  user_id = "";
  personal_info = {
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    dob: new Date(),
    present_address: {
      street: "",
      pincode: "",
      city: "",
      district: "",
      state: "",
    },
    are_addresses_same: true,
    permanent_address: {
      street: "",
      pincode: "",
      city: "",
      district: "",
      state: "",
    },
    email: "",
    contact: "",
    category: "",
    blood_group: "",
    aadhar_number: "",
    pan_number: "",
  };
  family_info = {
    father: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      contact: "",
    },
    mother: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      contact: "",
    },
    guardian: {
      first_name: "",
      middle_name: "",
      last_name: "",
      relation: "",
      office_address: {
        street: "",
        pincode: "",
        city: "",
        district: "",
        state: "",
      },
      occupation: "",
      designation: "",
      office_contact: "",
      contact: "",
      income: "",
      email: "",
      pan_number: "",
      aadhar_number: "",
    },
  };
  academic_info = {
    admission: { exam_name: "", year_of_exam: "", roll_number: "", rank: "" },
    secondary: {
      exam_name: "",
      year_of_exam: "",
      board: "",
      aggregate: "",
      school_name: "",
      subjectString: "",
      subjects: "",
      marks: {},
    },
    higher_secondary: {
      exam_name: "",
      year_of_exam: "",
      board: "",
      aggregate: "",
      school_name: "",
      subjectString: "",
      subjects: "",
      marks: {},
    },
  };
  course_info = {
    course_name: "",
    duration: "",
    stream: "",
    admission_year: "",
  };
  createdAt = null;
  updatedAt = null;

  // constructor(data, type) {
  //   this.image = data.image || "";
  //   if (data.user_id) {
  //     this.user_id = data.user_id;
  //   } else {
  //     throw new Error("Applicant User ID required");
  //   }
  //   const personalInfo = data.personal_info;
  //   const familyInfo = data.family_info;
  //   const academicInfo = data.academic_info;
  //   const courseInfo = data.course_info;

  //   //blue-f// Personal Info
  //   if (personalInfo) {
  //     if (personalInfo.name) {
  //       const nameObject = formatName(personalInfo.name);
  //       if (nameObject) {
  //         this.personal_info.first_name = nameObject.first_name;
  //         this.personal_info.middle_name = nameObject.middle_name;
  //         this.personal_info.last_name = nameObject.last_name;
  //       }
  //     }

  //     this.personal_info.gender = personalInfo.gender || "";
  //     this.personal_info.dob = personalInfo.dob || new Date();

  //     this.personal_info.present_address = setAddress(
  //       this.personal_info.present_address,
  //       personalInfo.present_address
  //     );

  //     this.personal_info.permanent_address = setAddress(
  //       this.personal_info.permanent_address,
  //       personalInfo.permanent_address
  //     );

  //     this.personal_info.are_addresses_same =
  //       personalInfo.are_addresses_same || true;

  //     this.personal_info.email = personalInfo.email || "";
  //     this.personal_info.contact = personalInfo.contact || "";
  //     this.personal_info.category = personalInfo.category || "";
  //     this.personal_info.blood_group = personalInfo.blood_group || "";
  //     this.personal_info.aadhar_number = personalInfo.aadhar_number || "";
  //     this.personal_info.pan_number = personalInfo.pan_number || "";
  //   }

  //   //blue-f// Family Info
  //   if (familyInfo) {
  //     const father = familyInfo.father;
  //     const mother = familyInfo.mother;
  //     const guardian = familyInfo.guardian;

  //     // father
  //     if (father) {
  //       if (father.name) {
  //         const nameObject = formatName(father.name);
  //         if (nameObject) {
  //           this.family_info.father.first_name = nameObject.first_name;
  //           this.family_info.father.middle_name = nameObject.middle_name;
  //           this.family_info.father.last_name = nameObject.last_name;
  //         }
  //       }
  //       this.family_info.father.email = father.email || "";
  //       this.family_info.father.contact = father.contact || "";
  //     }

  //     // mother
  //     if (mother) {
  //       if (mother.name) {
  //         const nameObject = formatName(mother.name);
  //         if (nameObject) {
  //           this.family_info.mother.first_name = nameObject.first_name;
  //           this.family_info.mother.middle_name = nameObject.middle_name;
  //           this.family_info.mother.last_name = nameObject.last_name;
  //         }
  //       }
  //       this.family_info.mother.email = mother.email || "";
  //       this.family_info.mother.contact = mother.contact || "";
  //     }
  //     // guardian
  //     if (guardian) {
  //       if (guardian.name) {
  //         const nameObject = formatName(guardian.name);
  //         if (nameObject) {
  //           this.family_info.guardian.first_name = nameObject.first_name;
  //           this.family_info.guardian.middle_name = nameObject.middle_name;
  //           this.family_info.guardian.last_name = nameObject.last_name;
  //         }
  //       }
  //       this.family_info.guardian.relation = guardian.relation || "";

  //       this.family_info.office_address = setAddress(
  //         this.family_info.office_address,
  //         guardian.office_address
  //       );
  //       this.family_info.guardian.occupation = guardian.occupation || "";
  //       this.family_info.guardian.designation = guardian.designation || "";
  //       this.family_info.guardian.office_contact =
  //         guardian.office_contact || "";
  //       this.family_info.guardian.contact = guardian.contact || "";
  //       this.family_info.guardian.income = guardian.income || "";
  //       this.family_info.guardian.email = guardian.email || "";
  //       this.family_info.guardian.pan_number = guardian.pan_number || "";
  //       this.family_info.guardian.aadhar_number = guardian.aadhar_number || "";
  //     }
  //   }

  //   //blue-f// Academic Info
  //   if (academicInfo) {
  //     const { admission, secondary, higher_secondary } = academicInfo;
  //     if (admission) {
  //       this.academic_info.admission.exam_name = admission.exam_name || "";
  //       this.academic_info.admission.year_of_exam =
  //         admission.year_of_exam || "";
  //       this.academic_info.admission.roll_number = admission.roll_number || "";
  //       this.academic_info.admission.rank = admission.rank || "";
  //     }

  //     if (secondary) {
  //       this.academic_info.secondary.exam_name = secondary.exam_name || "";
  //       this.academic_info.secondary.year_of_exam =
  //         secondary.year_of_exam || "";
  //       this.academic_info.secondary.board = secondary.board || "";
  //       this.academic_info.secondary.aggregate = secondary.aggregate || "";
  //       this.academic_info.secondary.school_name = secondary.school_name || "";
  //       this.academic_info.secondary.subjectString =
  //         secondary.subjectString || "";
  //       const sResult = formatMarks(secondary.subjectString);
  //       this.academic_info.secondary.subjects = sResult.subjects || "";
  //       this.academic_info.secondary.marks = sResult.marks || {};
  //     }

  //     if (higher_secondary) {
  //       this.academic_info.higher_secondary.exam_name =
  //         higher_secondary.exam_name || "";
  //       this.academic_info.higher_secondary.year_of_exam =
  //         higher_secondary.year_of_exam || "";
  //       this.academic_info.higher_secondary.board =
  //         higher_secondary.board || "";
  //       this.academic_info.higher_secondary.aggregate =
  //         higher_secondary.aggregate || "";
  //       this.academic_info.higher_secondary.school_name =
  //         higher_secondary.school_name || "";
  //       this.academic_info.higher_secondary.subjectString =
  //         higher_secondary.subjectString || "";
  //       const hsResult = formatMarks(higher_secondary.subjectString);
  //       this.academic_info.higher_secondary.subjects = hsResult.subjects || "";
  //       this.academic_info.higher_secondary.marks = hsResult.marks || {};
  //     }
  //   }
  //   // blue-f// Course Info
  //   if (courseInfo) {
  //     this.course_info.course_name = courseInfo.course_name || "";
  //     this.course_info.duration = courseInfo.duration || "";
  //     this.course_info.stream = courseInfo.stream || "";
  //     this.course_info.admission_year = courseInfo.admission_year || "";
  //   }

  //   // switch (type) {
  //   //   // case "personal":
  //   //   //   const {
  //   //   //     name,
  //   //   //     gender,
  //   //   //     dob,
  //   //   //     present_address,
  //   //   //     permanent_address,
  //   //   //     are_addresses_same,
  //   //   //     email,
  //   //   //     contact,
  //   //   //     category,
  //   //   //     blood_group,
  //   //   //     aadhar_number,
  //   //   //     pan_number,
  //   //   //   } = data;

  //   //   //   let personal_info = {};
  //   //   //   if (name) {
  //   //   //     const nameObject = formatName(name);
  //   //   //     if (nameObject) {
  //   //   //       personal_info.first_name = nameObject.first_name;
  //   //   //       personal_info.last_name = nameObject.last_name;
  //   //   //       if (nameObject.middle_name) {
  //   //   //         personal_info.middle_name = nameObject.middle_name;
  //   //   //       }
  //   //   //     }
  //   //   //   }

  //   //   //   if (gender) {
  //   //   //     personal_info.gender = gender;
  //   //   //   }
  //   //   //   if (dob) {
  //   //   //     personal_info.dob = new Date(dob);
  //   //   //   }

  //   //   //   if (present_address) {
  //   //   //     if (
  //   //   //       present_address.street &&
  //   //   //       present_address.pincode &&
  //   //   //       present_address.city &&
  //   //   //       present_address.district &&
  //   //   //       present_address.state
  //   //   //     ) {
  //   //   //       personal_info.present_address = present_address;
  //   //   //     }
  //   //   //   }
  //   //   //   if (permanent_address) {
  //   //   //     if (
  //   //   //       permanent_address.street &&
  //   //   //       permanent_address.pincode &&
  //   //   //       permanent_address.city &&
  //   //   //       permanent_address.district &&
  //   //   //       permanent_address.state
  //   //   //     ) {
  //   //   //       personal_info.permanent_address = permanent_address;
  //   //   //     }
  //   //   //   }

  //   //   //   personal_info.are_addresses_same = are_addresses_same;

  //   //   //   if (email) {
  //   //   //     personal_info.email = email;
  //   //   //   }
  //   //   //   if (contact) {
  //   //   //     personal_info.contact = contact;
  //   //   //   }
  //   //   //   if (category) {
  //   //   //     personal_info.category = category;
  //   //   //   }
  //   //   //   if (blood_group) {
  //   //   //     personal_info.blood_group = blood_group;
  //   //   //   }
  //   //   //   if (aadhar_number) {
  //   //   //     personal_info.aadhar_number = aadhar_number;
  //   //   //   }
  //   //   //   if (pan_number) {
  //   //   //     personal_info.pan_number = pan_number;
  //   //   //   }

  //   //   //   this.personal_info = personal_info;
  //   //   //   break;

  //   //   // case "family":
  //   //   //   const { father, mother, guardian } = data;
  //   //   //   // console.log(data);

  //   //   //   let family_info = {
  //   //   //     father: {},
  //   //   //     mother: {},
  //   //   //     guardian: {},
  //   //   //   };

  //   //   //   if (father) {
  //   //   //     // console.log("1");
  //   //   //     // console.log(father);
  //   //   //     if (father.name) {
  //   //   //       // console.log("2");
  //   //   //       const nameObject = formatName(father.name);
  //   //   //       // console.log(nameObject);

  //   //   //       family_info.father.first_name = nameObject.first_name;
  //   //   //       family_info.father.last_name = nameObject.last_name;

  //   //   //       if (nameObject.middle_name) {
  //   //   //         family_info.father.middle_name = nameObject.middle_name;
  //   //   //       }
  //   //   //     }

  //   //   //     if (father.email) {
  //   //   //       family_info.father.email = father.email;
  //   //   //     }

  //   //   //     if (father.contact) {
  //   //   //       family_info.father.contact = father.contact;
  //   //   //     }
  //   //   //   }

  //   //   //   if (mother) {
  //   //   //     if (mother.name) {
  //   //   //       const nameObject = formatName(mother.name);
  //   //   //       family_info.mother.first_name = nameObject.first_name;
  //   //   //       family_info.mother.last_name = nameObject.last_name;

  //   //   //       if (nameObject.middle_name) {
  //   //   //         family_info.mother.middle_name = nameObject.middle_name;
  //   //   //       }
  //   //   //     }

  //   //   //     if (mother.email) {
  //   //   //       family_info.mother.email = mother.email;
  //   //   //     }

  //   //   //     if (mother.contact) {
  //   //   //       family_info.mother.contact = mother.contact;
  //   //   //     }
  //   //   //   }

  //   //   //   if (guardian) {
  //   //   //     if (guardian.name) {
  //   //   //       const nameObject = formatName(guardian.name);
  //   //   //       family_info.guardian.first_name = nameObject.first_name;
  //   //   //       family_info.guardian.last_name = nameObject.last_name;

  //   //   //       if (nameObject.middle_name) {
  //   //   //         family_info.guardian.middle_name = nameObject.middle_name;
  //   //   //       }
  //   //   //     }

  //   //   //     if (guardian.relation) {
  //   //   //       family_info.guardian.relation = guardian.relation;
  //   //   //     }

  //   //   //     if (guardian.office_address) {
  //   //   //       if (
  //   //   //         guardian.office_address.street &&
  //   //   //         guardian.office_address.pincode &&
  //   //   //         guardian.office_address.city &&
  //   //   //         guardian.office_address.district &&
  //   //   //         guardian.office_address.state
  //   //   //       ) {
  //   //   //         family_info.guardian.office_address = guardian.office_address;
  //   //   //       }
  //   //   //     }

  //   //   //     if (guardian.occupation) {
  //   //   //       family_info.guardian.occupation = guardian.occupation;
  //   //   //     }

  //   //   //     if (guardian.designation) {
  //   //   //       family_info.guardian.designation = guardian.designation;
  //   //   //     }

  //   //   //     if (guardian.office_contact) {
  //   //   //       family_info.guardian.office_contact = guardian.office_contact;
  //   //   //     }

  //   //   //     if (guardian.contact) {
  //   //   //       family_info.guardian.contact = guardian.contact;
  //   //   //     }
  //   //   //     if (guardian.income) {
  //   //   //       family_info.guardian.income = guardian.income;
  //   //   //     }
  //   //   //     if (guardian.email) {
  //   //   //       family_info.guardian.email = guardian.email;
  //   //   //     }
  //   //   //     if (guardian.aadhar_number) {
  //   //   //       family_info.guardian.aadhar_number = guardian.aadhar_number;
  //   //   //     }
  //   //   //     if (guardian.pan_number) {
  //   //   //       family_info.guardian.pan_number = guardian.pan_number;
  //   //   //     }
  //   //   //   }

  //   //   //   this.family_info = family_info;
  //   //   //   break;

  //   //   // case "academic":
  //   //   //   const { admission, secondary, higher_secondary } = data;
  //   //   //   let academic_info = {
  //   //   //     admission: {},
  //   //   //     secondary: {},
  //   //   //     higher_secondary: {},
  //   //   //   };

  //   //   //   if (admission) {
  //   //   //     if (admission.exam_name) {
  //   //   //       academic_info.admission.exam_name = admission.exam_name;
  //   //   //     }
  //   //   //     if (admission.year_of_exam) {
  //   //   //       academic_info.admission.year_of_exam = admission.year_of_exam;
  //   //   //     }
  //   //   //     if (admission.roll_number) {
  //   //   //       academic_info.admission.roll_number = admission.roll_number;
  //   //   //     }
  //   //   //     if (admission.rank) {
  //   //   //       academic_info.admission.rank = admission.rank;
  //   //   //     }
  //   //   //   }

  //   //   //   if (secondary) {
  //   //   //     if (secondary.exam_name) {
  //   //   //       academic_info.secondary.exam_name = secondary.exam_name;
  //   //   //     }
  //   //   //     if (secondary.year_of_exam) {
  //   //   //       academic_info.secondary.year_of_exam = secondary.year_of_exam;
  //   //   //     }
  //   //   //     if (secondary.board) {
  //   //   //       academic_info.secondary.board = secondary.board;
  //   //   //     }
  //   //   //     if (secondary.aggregate) {
  //   //   //       academic_info.secondary.aggregate = secondary.aggregate;
  //   //   //     }
  //   //   //     if (secondary.school_name) {
  //   //   //       academic_info.secondary.school_name = secondary.school_name;
  //   //   //     }
  //   //   //     if (secondary.subjects) {
  //   //   //       // let subjectsArray = secondary.subjects.split(",");
  //   //   //       // let subjects = "",
  //   //   //       //   marks = {};
  //   //   //       // subjectsArray.forEach((subject) => {
  //   //   //       //   subject = subject.split("-");
  //   //   //       //   subjects = subjects + subject[0];
  //   //   //       //   marks[subject[0]] = subject[1];
  //   //   //       // });

  //   //   //       const { subjects, marks } = formatMarks(secondary.subjects);
  //   //   //       academic_info.secondary.subjectString = secondary.subjects;
  //   //   //       academic_info.secondary.subjects = subjects;
  //   //   //       academic_info.secondary.marks = marks;
  //   //   //     }
  //   //   //   }

  //   //   //   if (higher_secondary) {
  //   //   //     if (higher_secondary.exam_name) {
  //   //   //       academic_info.higher_secondary.exam_name =
  //   //   //         higher_secondary.exam_name;
  //   //   //     }
  //   //   //     if (higher_secondary.year_of_exam) {
  //   //   //       academic_info.higher_secondary.year_of_exam =
  //   //   //         higher_secondary.year_of_exam;
  //   //   //     }
  //   //   //     if (higher_secondary.board) {
  //   //   //       academic_info.higher_secondary.board = higher_secondary.board;
  //   //   //     }
  //   //   //     if (higher_secondary.aggregate) {
  //   //   //       academic_info.higher_secondary.aggregate =
  //   //   //         higher_secondary.aggregate;
  //   //   //     }
  //   //   //     if (higher_secondary.school_name) {
  //   //   //       academic_info.higher_secondary.school_name =
  //   //   //         higher_secondary.school_name;
  //   //   //     }
  //   //   //     if (higher_secondary.subjects) {
  //   //   //       // let subjectsArray = higher_secondary.subjects.split(",");
  //   //   //       // let subjects = "",
  //   //   //       //   marks = {};
  //   //   //       // subjectsArray.forEach((subject) => {
  //   //   //       //   subject = subject.split("-");
  //   //   //       //   subjects = subjects + subject[0];
  //   //   //       //   marks[subject[0]] = subject[1];
  //   //   //       // });

  //   //   //       const { subjects, marks } = formatMarks(higher_secondary.subjects);
  //   //   //       academic_info.higher_secondary.subjectString =
  //   //   //         higher_secondary.subjects;
  //   //   //       academic_info.higher_secondary.subjects = subjects;
  //   //   //       academic_info.higher_secondary.marks = marks;
  //   //   //     }
  //   //   //   }

  //   //   //   this.academic_info = academic_info;
  //   //   //   break;

  //   //   case "course":
  //   //     const { course_name, duration, stream, admission_year } = data;
  //   //     let course_info = {};
  //   //     if (course_name) {
  //   //       course_info.course_name = course_name;
  //   //     }
  //   //     if (duration) {
  //   //       course_info.duration = duration;
  //   //     }
  //   //     if (stream) {
  //   //       course_info.stream = stream;
  //   //     }
  //   //     if (admission_year) {
  //   //       course_info.admission_year = admission_year;
  //   //     }
  //   //     this.course_info = course_info;
  //   //     break;

  //   //   default:
  //   //     break;
  //   // }
  // }

  constructor() {
    // this.image = null;
    // this.user_id = null;
    // this.personal_info = {
    //   first_name: "",
    //   middle_name: null,
    //   last_name: "",
    //   gender: "",
    //   dob: null,
    //   present_address: {
    //     street: "",
    //     pincode: "",
    //     city: "",
    //     district: "",
    //     state: "",
    //   },
    //   are_addresses_same: true,
    //   permanent_address: {
    //     street: "",
    //     pincode: "",
    //     city: "",
    //     district: "",
    //     state: "",
    //   },
    //   email: "",
    //   contact: "",
    //   category: "",
    //   blood_group: "",
    //   aadhar_number: "",
    //   pan_number: "",
    // };

    this.family_info = {
      father: {
        first_name: "",
        middle_name: null,
        last_name: "",
        email: "",
        contact: "",
      },
      mother: {
        first_name: "",
        middle_name: null,
        last_name: "",
        email: "",
        contact: "",
      },
      guardian: {
        first_name: "",
        middle_name: null,
        last_name: "",
        relation: "",
        office_address: {
          street: "",
          pincode: "",
          city: "",
          district: "",
          state: "",
        },
        occupation: "",
        designation: "",
        office_contact: "",
        contact: "",
        income: "",
        email: "",
        pan_number: "",
        aadhar_number: "",
      },
    };
    this.academic_info = {
      admission: { exam_name: "", year_of_exam: "", roll_number: "", rank: "" },
      secondary: {
        exam_name: "",
        year_of_exam: "",
        board: "",
        aggregate: "",
        school_name: "",
        subjectString: "",
        subjects: "",
        marks: null,
      },
      higher_secondary: {
        exam_name: "",
        year_of_exam: "",
        board: "",
        aggregate: "",
        school_name: "",
        subjectString: "",
        subjects: "",
        marks: null,
      },
    };
    this.course_info = {
      course_name: "",
      duration: "",
      stream: "",
      admission_year: "",
    };
    // this.createdAt = new Date();
    // this.updatedAt = new Date();
  }

  async findOneByUserID(user_id) {
    try {
      const applicantData = await ApplicantCollection.findOne({ user_id });
      this.image = applicantData.image;
      this.user_id = applicantData.user_id;
      this.personal_info = applicantData.personal_info;
      this.academic_info = applicantData.academic_info;
      this.family_info = applicantData.family_info;
      this.course_info = applicantData.course_info;
      this.createdAt = applicantData.createdAt;
      this.updatedAt = applicantData.updatedAt;
      return this;
    } catch (error) {
      throw new NotFoundError("Applicant", "UserID", user_id);
    }
  }
  async updateByUserID(user_id) {
    try {
      const applicantData = await ApplicantCollection.findOneAndUpdate(
        { user_id },
        {
          image: this.image,
          user_id: this.user_id,
          personal_info: this.personal_info,
          academic_info: this.academic_info,
          family_info: this.family_info,
          course_info: this.course_info,
        },
        { new: true }
      );
      this.image = applicantData.image;
      this.user_id = applicantData.user_id;
      this.personal_info = applicantData.personal_info;
      this.academic_info = applicantData.academic_info;
      this.family_info = applicantData.family_info;
      this.course_info = applicantData.course_info;
      return this;
    } catch (error) {
      throw new BadRequestError("Applicant", "Update");
    }
  }

  //blue-f// Personal Info Setter Methods
  //blue-u// Personal Info Setter
  setPersonalInfo(data) {
    const {
      name,
      gender,
      dob,
      present_address,
      permanent_address,
      email,
      contact,
      category,
      blood_group,
      aadhar_number,
      pan_number,
    } = data;
    this.setName(name)
      .setGender(gender)
      .setDOB(dob)
      .setAddress("present", present_address)
      .setAddress("permanent", permanent_address)
      .areAddressesSame()
      .setEmail("personal", email)
      .setContact("personal", contact)
      .setCategory(category)
      .setBloodGroup(blood_group)
      .setAadharNumber("personal", aadhar_number)
      .setPanNumber("personal", pan_number);
    return this;
  }
  //blue-u// Family Info Setter
  setFamilyInfo(data) {
    const {
      name,
      gender,
      dob,
      present_address,
      permanent_address,
      email,
      contact,
      category,
      blood_group,
      aadhar_number,
      pan_number,
    } = data;
    this.setName(name)
      .setGender(gender)
      .setDOB(dob)
      .setAddress("present", present_address)
      .setAddress("permanent", permanent_address)
      .areAddressesSame()
      .setEmail("personal", email)
      .setContact("personal", contact)
      .setCategory(category)
      .setBloodGroup(blood_group)
      .setAadharNumber("personal", aadhar_number)
      .setPanNumber("personal", pan_number);
    return this;
  }

  //blue-u// Name Setter
  setName(data) {
    const name = data;

    if (name) {
      const nameObject = formatName(name);
      if (!nameObject) {
        throw new FailedValidationError("Applicant", "name", name);
      }
      this.personal_info.first_name = nameObject.first_name;
      this.personal_info.last_name = nameObject.last_name;
      if (nameObject.middle_name) {
        this.personal_info.middle_name = nameObject.middle_name;
      } else {
        this.personal_info.middle_name = undefined;
      }
    }

    return this;
  }
  //blue-u// Gender Setter
  setGender(gender) {
    validate.isEmpty(gender, "Applicant", "Gender");
    validate.isInArray(gender, GENDERS, "Applicant", "Gender");
    this.personal_info.gender = gender.toLowerCase();
    return this;
  }
  //blue-u// Date Of Birth Setter
  setDOB(dob) {
    const givenDOB = new Date(dob);
    // console.log(typeof givenDOB, givenDOB.getTime());
    const yearDiff = new Date().getFullYear() - givenDOB.getFullYear();
    if (isNaN(givenDOB.getTime()) || yearDiff < 15) {
      throw new FailedValidationError("Applicant", "Date of Birth", dob);
    }
    this.personal_info.dob = givenDOB;
    return this;
  }

  //blue-u// All Addresses Setter
  setAddress(addressType, address) {
    if (!["present", "permanent", "office"].includes(addressType)) {
      throw new Error("Server Error: Invalid Address Type");
    }
    const { pincode, street, city, district, state } = address;
    validate.isEmpty(pincode, "Applicant", addressType + " Address->Pincode");
    validate.isEmpty(street, "Applicant", addressType + " Address->Street");
    validate.isEmpty(city, "Applicant", addressType + " Address->City");
    validate.isEmpty(district, "Applicant", addressType + " Address->District");
    validate.isEmpty(state, "Applicant", addressType + " Address->State");

    switch (addressType) {
      case "present":
        this.personal_info.present_address = formatAddress(address);
        break;
      case "permanent":
        this.personal_info.permanent_address = formatAddress(address);
        break;
      case "office":
        this.family_info.guardian.office_address = formatAddress(address);
        break;
    }
    return this;
  }

  //blue-u// Are Addresses Same Setter
  areAddressesSame() {
    //LEAVE FOR NOW
    const address1 = this.personal_info.present_address;
    const address2 = this.personal_info.permanent_address;

    this.personal_info.are_addresses_same =
      address1.pincode === address2.pincode &&
      address1.street === address2.street &&
      address1.city === address2.city &&
      address1.district === address2.district &&
      address1.state === address2.state;
    // this.personal_info.are_addresses_same = isSame;
    return this;
  }
  //blue-u// All Email Setter
  setEmail(emailFor, email) {
    if (!["personal", "father", "mother", "guardian"].includes(emailFor)) {
      throw new Error("Server Error: Invalid Email For");
    }
    validate.isValidEmail(email, "Applicant->" + emailFor, "Email");
    switch (emailFor) {
      case "personal":
        this.personal_info.email = email;
        break;
      case "father":
        this.family_info.father.email = email;
        break;
      case "mother":
        this.family_info.mother.email = email;
        break;
      case "guardian":
        this.family_info.guardian.email = email;
        break;

      default:
        break;
    }
    return this;
  }
  //blue-u// All Contact Setter
  setContact(contactFor, contact) {
    if (!["personal", "father", "mother", "guardian"].includes(contactFor)) {
      throw new Error("Server Error: Invalid Contact For");
    }
    validate.isValidContact(contact, "Applicant->" + contactFor, "Contact");
    switch (contactFor) {
      case "personal":
        this.personal_info.contact = contact;
        break;
      case "father":
        this.family_info.father.contact = contact;
        break;
      case "mother":
        this.family_info.mother.contact = contact;
        break;
      case "guardian":
        this.family_info.guardian.contact = contact;
        break;

      default:
        break;
    }
    return this;
  }

  //blue-u// Category Setter
  setCategory(category) {
    validate.isEmpty(category, "Applicant", "Category");
    validate.isInArray(category, CATEGORY, "Applicant", "Category");
    this.personal_info.category = category.toLowerCase();
    return this;
  }

  //blue-u// Blood Group Setter
  setBloodGroup(bloodGroup) {
    validate.isEmpty(bloodGroup, "Applicant", "Category");
    bloodGroup = bloodGroup.toUpperCase();
    validate.isInArray(bloodGroup, BLOOD_GROUPS, "Applicant", "Blood Group");
    this.personal_info.blood_group = bloodGroup;
    return this;
  }

  //blue-u// Aadhar Number Setter
  setAadharNumber(numberFor, number) {
    if (!["personal", "guardian"].includes(numberFor)) {
      throw new Error("Server Error: Invalid Aadhar Number For");
    }
    validate.isEmpty(number, "Applicant", numberFor + "->Aadhar Number");
    switch (numberFor) {
      case "personal":
        this.personal_info.aadhar_number = number;
        break;
      case "guardian":
        this.family_info.guardian.aadhar_number = number;
        break;
      default:
        break;
    }
    return this;
  }
  //blue-u// PAN Number Setter
  setPanNumber(numberFor, number) {
    if (!["personal", "guardian"].includes(numberFor)) {
      throw new Error("Server Error: Invalid PAN Number For");
    }
    validate.isEmpty(number, "Applicant", numberFor + "->PAN Number");
    number = number.toUpperCase();
    switch (numberFor) {
      case "personal":
        this.personal_info.pan_number = number;
        break;
      case "guardian":
        this.family_info.guardian.pan_number = number;
        break;
      default:
        break;
    }
    return this;
  }

  // static async isExistingApplicant(user_id){
  //   try {
  //     const applicantData = await ApplicantCollection.findOne({ user_id });
  //     if(applicantData){
  //       return applicantData
  //     }
  //   } catch (error) {
  //     throw new NotFoundError("Applicant", "UserID", user_id);
  //   }
  // }
}

module.exports = Applicant;
