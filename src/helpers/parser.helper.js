const REGEX = require("../data/regex.data");

class Parser {
  static parseName(name) {
    const nameObj = {};
    const nameArray = name.split(REGEX.WHITESPACES);
    if (nameArray.length <= 1) {
      throw new Error("Invalid name");
    } else if (nameArray.length == 2) {
      nameObj.first_name = nameArray[0];
      nameObj.last_name = nameArray[1];
    } else {
      nameObj.first_name = nameArray[0];
      nameObj.last_name = nameArray[nameArray.length - 1];
      nameObj.middle_name = nameArray.slice(1, nameArray.length - 1).join(" ");
    }
    return nameObj;
  }
  static parsePlatfomData(data, platform) {
    let image = null;
    let personal_info = {};
    switch (platform) {
      case "google":
        personal_info = this.parseName(data.user.name);
        personal_info.email = data.user.email;
        image = data.user.image;
        break;
      case "github":
        personal_info.email = data.user.email;
        image = data.user.image;
        break;
      case "facebook":
        throw new Error("Coming Soon");
        break;
      case "x":
        throw new Error("Coming Soon");
        break;
      case "linkedin":
        throw new Error("Coming Soon");
        break;

      default:
        break;
    }
    return { image: image, personal_info };
  }
}

module.exports = Parser;
