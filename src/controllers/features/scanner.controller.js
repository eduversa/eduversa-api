const { Response } = require("../../helpers");
const { ScannerService, StudentService } = require("../../services");
class ScannerController {
  static processScannedQR = async (req, res, next) => {
    try {
      const { type, data } = req.body;
      const response = new Response.Ok(res).setMessage("Account Verified");
      switch (type) {
        case "security_token":
          const user_id = await ScannerService.processSecurityToken(
            data.security_token
          );
          const student = await StudentService.getStudentUsingUserId(user_id);
          switch (data.accessLevel) {
            case 2:
              response.send();
              break;
            case 3:
              response
                .setData({
                  personal_info: {
                    first_name: student.personal_info.first_name,
                    middle_name: student.personal_info.middle_name,
                    last_name: student.personal_info.last_name,
                  },
                  course_info: student.course_info,
                })
                .send();
              break;
            case 4:
              response.setData(student).send();
              break;

            default:
              break;
          }
          break;
        case "attendance":
          new Response.Accepted(res).setMessage("Not Implemented").send();
          break;

        default:
          throw new Error("Invalid Data");
          break;
      }
    } catch (error) {
      console.log("Error - ScannerController - processScannedQR");
      next(error);
    }
  };
}
module.exports = ScannerController;
