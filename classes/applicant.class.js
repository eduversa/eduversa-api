const { formatName } = require("../functions/account.functions");

class Applicant {
  constructor(data, type) {
    // if(!Object.keys(personal_info).length){

    // }
    switch (type) {
      case "personal":
        const {
          name,
          gender,
          dob,
          present_address,
          permanent_address,
          are_addresses_same,
          email,
          contact,
          category,
          blood_group,
          aadhar_number,
          pan_number,
        } = data;

        let personal_info = {};
        if (name) {
          const nameObject = formatName(name);
          if (nameObject) {
            personal_info.first_name = nameObject.first_name;
            personal_info.last_name = nameObject.last_name;
            if (nameObject.middle_name) {
              personal_info.middle_name = nameObject.middle_name;
            }
          }
        }

        if (gender) {
          personal_info.gender = gender;
        }
        if (dob) {
          personal_info.dob = new Date(dob);
        }

        if (present_address) {
          if (
            present_address.street &&
            present_address.pincode &&
            present_address.city &&
            present_address.district &&
            present_address.state
          ) {
            personal_info.present_address = present_address;
          }
        }
        if (permanent_address) {
          if (
            permanent_address.street &&
            permanent_address.pincode &&
            permanent_address.city &&
            permanent_address.district &&
            permanent_address.state
          ) {
            personal_info.permanent_address = permanent_address;
          }
        }

        personal_info.are_addresses_same = are_addresses_same;

        if (email) {
          personal_info.email = email;
        }
        if (contact) {
          personal_info.contact = contact;
        }
        if (category) {
          personal_info.category = category;
        }
        if (blood_group) {
          personal_info.blood_group = blood_group;
        }
        if (aadhar_number) {
          personal_info.aadhar_number = aadhar_number;
        }
        if (pan_number) {
          personal_info.pan_number = pan_number;
        }

        this.personal_info = personal_info;
        break;

      case "family":
        const { father, mother, guardian } = data;
        // console.log(data);

        let family_info = {
          father: {},
          mother: {},
          guardian: {},
        };

        if (father) {
          // console.log("1");
          // console.log(father);
          if (father.name) {
            // console.log("2");
            const nameObject = formatName(father.name);
            // console.log(nameObject);

            family_info.father.first_name = nameObject.first_name;
            family_info.father.last_name = nameObject.last_name;

            if (nameObject.middle_name) {
              family_info.father.middle_name = nameObject.middle_name;
            }
          }

          if (father.email) {
            family_info.father.email = father.email;
          }

          if (father.contact) {
            family_info.father.contact = father.contact;
          }
        }

        if (mother) {
          if (mother.name) {
            const nameObject = formatName(mother.name);
            family_info.mother.first_name = nameObject.first_name;
            family_info.mother.last_name = nameObject.last_name;

            if (nameObject.middle_name) {
              family_info.mother.middle_name = nameObject.middle_name;
            }
          }

          if (mother.email) {
            family_info.mother.email = mother.email;
          }

          if (mother.contact) {
            family_info.mother.contact = mother.contact;
          }
        }

        if (guardian) {
          if (guardian.name) {
            const nameObject = formatName(guardian.name);
            family_info.guardian.first_name = nameObject.first_name;
            family_info.guardian.last_name = nameObject.last_name;

            if (nameObject.middle_name) {
              family_info.guardian.middle_name = nameObject.middle_name;
            }
          }

          if (guardian.relation) {
            family_info.guardian.relation = guardian.relation;
          }

          if (guardian.office_address) {
            if (
              guardian.office_address.street &&
              guardian.office_address.pincode &&
              guardian.office_address.city &&
              guardian.office_address.district &&
              guardian.office_address.state
            ) {
              family_info.guardian.office_address = guardian.office_address;
            }
          }

          if (guardian.occupation) {
            family_info.guardian.occupation = guardian.occupation;
          }

          if (guardian.designation) {
            family_info.guardian.designation = guardian.designation;
          }

          if (guardian.office_contact) {
            family_info.guardian.office_contact = guardian.office_contact;
          }

          if (guardian.contact) {
            family_info.guardian.contact = guardian.contact;
          }
          if (guardian.income) {
            family_info.guardian.income = guardian.income;
          }
          if (guardian.email) {
            family_info.guardian.email = guardian.email;
          }
          if (guardian.aadhar_number) {
            family_info.guardian.aadhar_number = guardian.aadhar_number;
          }
          if (guardian.pan_number) {
            family_info.guardian.pan_number = guardian.pan_number;
          }
        }

        this.family_info = family_info;
        break;

      case "academic":
        const { admission, secondary, higher_secondary } = data;
        let academic_info = {
          admission: {},
          secondary: {},
          higher_secondary: {},
        };

        if (admission) {
          if (admission.exam_name) {
            academic_info.admission.exam_name = admission.exam_name;
          }
          if (admission.year_of_exam) {
            academic_info.admission.year_of_exam = admission.year_of_exam;
          }
          if (admission.roll_number) {
            academic_info.admission.roll_number = admission.roll_number;
          }
          if (admission.rank) {
            academic_info.admission.rank = admission.rank;
          }
        }

        if (secondary) {
          if (secondary.exam_name) {
            academic_info.secondary.exam_name = secondary.exam_name;
          }
          if (secondary.year_of_exam) {
            academic_info.secondary.year_of_exam = secondary.year_of_exam;
          }
          if (secondary.board) {
            academic_info.secondary.board = secondary.board;
          }
          if (secondary.aggregate) {
            academic_info.secondary.aggregate = secondary.aggregate;
          }
          if (secondary.school_name) {
            academic_info.secondary.school_name = secondary.school_name;
          }
          if (secondary.subjects) {
            let subjectsArray = secondary.subjects.split(",");
            let subjects = "",
              marks = {};
            subjectsArray.forEach((subject) => {
              subject = subject.split("-");
              subjects = subjects + subject[0];
              marks[subject[0]] = subject[1];
            });

            academic_info.secondary.subjects = subjects;
            academic_info.secondary.marks = marks;
          }
        }

        if (higher_secondary) {
          if (higher_secondary.exam_name) {
            academic_info.higher_secondary.exam_name =
              higher_secondary.exam_name;
          }
          if (higher_secondary.year_of_exam) {
            academic_info.higher_secondary.year_of_exam =
              higher_secondary.year_of_exam;
          }
          if (higher_secondary.board) {
            academic_info.higher_secondary.board = higher_secondary.board;
          }
          if (higher_secondary.aggregate) {
            academic_info.higher_secondary.aggregate =
              higher_secondary.aggregate;
          }
          if (higher_secondary.school_name) {
            academic_info.higher_secondary.school_name =
              higher_secondary.school_name;
          }
          if (higher_secondary.subjects) {
            let subjectsArray = higher_secondary.subjects.split(",");
            let subjects = "",
              marks = {};
            subjectsArray.forEach((subject) => {
              subject = subject.split("-");
              subjects = subjects + subject[0];
              marks[subject[0]] = subject[1];
            });

            academic_info.higher_secondary.subjects = subjects;
            academic_info.higher_secondary.marks = marks;
          }
        }

        this.academic_info = academic_info;
        break;

      case "course":
        const { course_name, duration, stream, admission_year } = data;
        let course_info = {};
        if (course_name) {
          course_info.course_name = course_name;
        }
        if (duration) {
          course_info.duration = duration;
        }
        if (stream) {
          course_info.stream = stream;
        }
        if (admission_year) {
          course_info.admission_year = admission_year;
        }
        this.course_info = course_info;
        break;

      default:
        break;
    }
  }
}

module.exports = Applicant;
