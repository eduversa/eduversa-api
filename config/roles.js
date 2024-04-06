const ROLES = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
  APPLICANT: "applicant",
};

const ACCESS_LEVEL = {
  ADMIN: 4,
  FACULTY: 3,
  STUDENT: 2,
  APPLICANT: 1,
};

module.exports = { ROLES, ACCESS_LEVEL };
