class FamilyInfo {
  father = {
    first_name: null,
    middle_name: null,
    last_name: null,
    email: null,
    contact: null,
  };
  mother = {
    first_name: null,
    middle_name: null,
    last_name: null,
    email: null,
    contact: null,
  };
  guardian = {
    first_name: null,
    middle_name: null,
    last_name: null,
    relation: null,
    office_address: {
      street: null,
      pincode: null,
      city: null,
      district: null,
      state: null,
    },
    occupation: null,
    designation: null,
    office_contact: null,
    contact: null,
    income: null,
    email: null,
    pan_number: null,
    aadhar_number: null,
  };

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }

  setData(data) {
    const { father, mother, guardian } = data;
    if (father) {
      const { first_name, middle_name, last_name, email, contact } = father;

      if (first_name) {
        this.father.first_name = first_name;
      }
      if (middle_name) {
        this.father.middle_name = middle_name;
      }
      if (last_name) {
        this.father.last_name = last_name;
      }
      if (email) {
        this.father.email = email;
      }
      if (contact) {
        this.father.contact = contact;
      }
    }
    if (mother) {
      const { first_name, middle_name, last_name, email, contact } = mother;

      if (first_name) {
        this.mother.first_name = first_name;
      }
      if (middle_name) {
        this.mother.middle_name = middle_name;
      }
      if (last_name) {
        this.mother.last_name = last_name;
      }
      if (email) {
        this.mother.email = email;
      }
      if (contact) {
        this.mother.contact = contact;
      }
    }
    if (guardian) {
      const {
        first_name,
        middle_name,
        last_name,
        relation,
        office_address,
        occupation,
        designation,
        office_contact,
        income,
        email,
        contact,
        pan_number,
        aadhar_number,
      } = guardian;

      if (first_name) {
        this.guardian.first_name = first_name;
      }
      if (middle_name) {
        this.guardian.middle_name = middle_name;
      }
      if (last_name) {
        this.guardian.last_name = last_name;
      }
      if (relation) {
        this.guardian.relation = relation;
      }
      if (office_address && typeof office_address == "object") {
        const { street, pincode, city, district, state } = office_address;
        this.guardian.office_address.street = street;
        this.guardian.office_address.pincode = pincode;
        this.guardian.office_address.city = city;
        this.guardian.office_address.district = district;
        this.guardian.office_address.state = state;
      }
      if (occupation) {
        this.guardian.occupation = occupation;
      }
      if (designation) {
        this.guardian.designation = designation;
      }
      if (office_contact) {
        this.guardian.office_contact = office_contact;
      }
      if (income) {
        this.guardian.income = income;
      }
      if (pan_number) {
        this.guardian.pan_number = pan_number;
      }
      if (aadhar_number) {
        this.guardian.aadhar_number = aadhar_number;
      }
      if (email) {
        this.father.email = email;
      }
      if (contact) {
        this.father.contact = contact;
      }
    }

    return this;
  }

  static Builder = class {
    father = {
      first_name: null,
      middle_name: null,
      last_name: null,
      email: null,
      contact: null,
    };
    mother = {
      first_name: null,
      middle_name: null,
      last_name: null,
      email: null,
      contact: null,
    };
    guardian = {
      first_name: null,
      middle_name: null,
      last_name: null,
      relation: null,
      office_address: {
        street: null,
        pincode: null,
        city: null,
        district: null,
        state: null,
      },
      occupation: null,
      designation: null,
      office_contact: null,
      contact: null,
      income: null,
      email: null,
      pan_number: null,
      aadhar_number: null,
    };

    constructor(data) {
      if (data && typeof data == "object") {
        this.setData(data);
      }
    }

    setData(data) {
      const { father, mother, guardian } = data;
      if (father && typeof father == "object") {
        this.setFatherData(father);
      }
      if (mother && typeof mother == "object") {
        this.setMotherData(mother);
      }
      if (guardian && typeof guardian == "object") {
        this.setGuardianData(guardian);
      }
      return this;
    }

    setFatherData(father) {
      const { first_name, middle_name, last_name, email, contact } = father;

      if (first_name) {
        this.father.first_name = first_name;
      }
      if (middle_name) {
        this.father.middle_name = middle_name;
      }
      if (last_name) {
        this.father.last_name = last_name;
      }
      if (email) {
        this.father.email = email;
      }
      if (contact) {
        this.father.contact = contact;
      }
      return this;
    }
    setMotherData(mother) {
      const { first_name, middle_name, last_name, email, contact } = mother;

      if (first_name) {
        this.mother.first_name = first_name;
      }
      if (middle_name) {
        this.mother.middle_name = middle_name;
      }
      if (last_name) {
        this.mother.last_name = last_name;
      }
      if (email) {
        this.mother.email = email;
      }
      if (contact) {
        this.mother.contact = contact;
      }
      return this;
    }
    setGuardianData(guardian) {
      const {
        first_name,
        middle_name,
        last_name,
        relation,
        office_address,
        occupation,
        designation,
        office_contact,
        income,
        email,
        contact,
        pan_number,
        aadhar_number,
      } = guardian;

      if (first_name) {
        this.guardian.first_name = first_name;
      }
      if (middle_name) {
        this.guardian.middle_name = middle_name;
      }
      if (last_name) {
        this.guardian.last_name = last_name;
      }
      if (relation) {
        this.guardian.relation = relation;
      }
      if (office_address && typeof office_address == "object") {
        const { street, pincode, city, district, state } = office_address;
        this.guardian.office_address.street = street;
        this.guardian.office_address.pincode = pincode;
        this.guardian.office_address.city = city;
        this.guardian.office_address.district = district;
        this.guardian.office_address.state = state;
      }
      if (occupation) {
        this.guardian.occupation = occupation;
      }
      if (designation) {
        this.guardian.designation = designation;
      }
      if (office_contact) {
        this.guardian.office_contact = office_contact;
      }
      if (income) {
        this.guardian.income = income;
      }
      if (pan_number) {
        this.guardian.pan_number = pan_number;
      }
      if (aadhar_number) {
        this.guardian.aadhar_number = aadhar_number;
      }
      if (email) {
        this.father.email = email;
      }
      if (contact) {
        this.father.contact = contact;
      }
      return this;
    }

    build() {
      return new FamilyInfo(this);
    }
  };
}

module.exports = FamilyInfo;
