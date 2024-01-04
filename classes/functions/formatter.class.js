class Formatter {
  name = (name) => {
    name = name.split(" ");
    name = name.filter((element) => element !== "");

    // console.log(name)
    const len = name.length;

    if (len <= 1) {
      return undefined;
    }

    name = name.map((element) => {
      return element[0].toUpperCase() + element.slice(1, element.length);
    });

    const first_name = name[0];
    const middle_name = name.slice(1, len - 1).join(" ");
    const last_name = name[len - 1];

    const nameObject = {
      first_name,
      last_name,
    };

    if (middle_name !== "") {
      nameObject.middle_name = middle_name;
    }

    return nameObject;
  };
  address(data) {
    let object = {};
    if (data) {
      object.street = data.street;
      object.pincode = data.pincode;
      object.district = data.district;
      object.city = data.city;
      object.state = data.state;
    }

    return object;
  }
}

const format = new Formatter();
module.exports = format;
