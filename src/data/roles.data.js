const ROLES = {
  APPLICANT: { TYPE: "applicant", ACCESS_LEVEL: 1 },
  STUDENT: { TYPE: "student", ACCESS_LEVEL: 2 },
  FACULTY: { TYPE: "faculty", ACCESS_LEVEL: 3 },
  ADMIN: { TYPE: "admin", ACCESS_LEVEL: 4 },
  SUPER_ADMIN: { TYPE: "superadmin", ACCESS_LEVEL: 5 },
};

module.exports = ROLES;
