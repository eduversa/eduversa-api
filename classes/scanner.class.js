const { PrismLogger } = require("prism-logger");
const Student = require("./profiles/student.builder");
const jwt = require("jsonwebtoken");
const { ACCESS_LEVEL } = require("../config/roles");

class Scanner {
  type = "";
  data = {};

  constructor(input) {
    (this.type = input.type), (this.data = input.data);
    console.log("---->", this.data);
  }

  async processSecurityToken() {
    PrismLogger.log("security token");
    const student = new Student();
    const token = this.data.security_token;
    const accessLevel = this.data.accessLevel;
    const user_id = jwt.verify(token, process.env.SECURITY_KEY).user_id;

    await student.findOneByStudentID(user_id);
    let res = { status: true, message: "" };
    switch (accessLevel) {
      case ACCESS_LEVEL.ADMIN:
        res.message = "Student verified";
        res.data = student;
        break;
      case ACCESS_LEVEL.FACULTY:
        res.message = "Student verified";
        res.data = {
          personal_info: {
            first_name: student.personal_info.first_name,
            last_name: student.personal_info.last_name,
            user_id: student.user_id,
          },
          course_info: student.course_info,
        };
        break;

      case ACCESS_LEVEL.STUDENT:
        res.message = "Student verified";
        break;
      default:
        console.log("Unauthorized Access");
        break;
    }

    return res;
  }
  processAttendance() {
    PrismLogger.log("Attendance");
  }

  async processInput(req, res) {
    switch (this.type) {
      case "security_token":
        const result = await this.processSecurityToken();
        res.status(200).send(result);
        break;
      case "attendance":
        this.processAttendance();
        break;

      default:
        break;
    }
  }
}

module.exports = Scanner;
