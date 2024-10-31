const { Response } = require("../helpers");

const handleError = (error, req, res, next) => {
  try {
    console.log(error);

    new Response.Custom(res)
      .setStatusCode(error.statusCode || 400)
      .setMessage(error.message || "Internal Server Error")
      .setAttribute("type", error.type)
      .send();
  } catch (err) {
    console.log("Error -> " + err);
  }
};

module.exports = { handleError };
