const jwt = require("jsonwebtoken");

class ScannerService {
  static processSecurityToken = async (token) => {
    try {
      const data = jwt.verify(token, process.env.SECURITY_KEY);
      return data.user_id;
    } catch (error) {
      console.log("Error - ScannerService - processSecurityToken");
      throw error;
    }
  };
}
module.exports = ScannerService;
