class Generator {
  static getRandomNumber = (len) => {
    const multiplier = Math.pow(10, len - 1);
    return Math.floor(Math.random() * 9 * multiplier + multiplier);
  };
  static getRandomString = (len, special = false) => {
    const alphas = "qwertyuiopasdfghjklzxcvbnm";
    const nums = "9876543210";
    const specials = "!@#$%^";

    let chars;
    if (special) {
      chars = alphas + nums + specials + alphas.toUpperCase();
    } else {
      chars = alphas + nums + alphas.toUpperCase();
    }

    chars = chars.split("");

    let res = "";

    for (let i = 0; i < len; i++) {
      res = res + chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  };
  static getPassword = () => {
    return "Test@1234";
  };
  static getOtp = () => {
    return "12345678";
  };

  // Section: ID Generators
  static getFacultyId = () => {
    return `F${this.getRandomNumber(3)}`;
  };
  static getSubjectId = () => {
    return `S${this.getRandomNumber(3)}`;
  };
  static getRoomId = () => {
    return `R${this.getRandomNumber(3)}`;
  };
  static getUserId = () => {
    return `${new Date().getFullYear()}00${this.getRandomNumber(5)}`;
  };
  static getDepartmentId = () => {
    return `D${this.getRandomNumber(3)}`;
  };

  static getPermissionCode = () => {
    return `${randomStringGenerator(20)}`;
  };
}

module.exports = Generator;
