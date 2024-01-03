const emptyStringRegEx = /^\s*$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const contactRegex = /^[6789]\d{9}$/;

module.exports = { emptyStringRegEx, emailRegex, contactRegex };
