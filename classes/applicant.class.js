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


        this.personal_info = personal_info
        break;

      case "family":
        // const 
        break;

      case "academic":

        break;

      case "course":

        break;

      default:
        break;
    }
  }
}


module.exports = Applicant