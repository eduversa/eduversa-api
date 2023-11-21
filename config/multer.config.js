const multer = require("multer");


var profileImageUploader = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public");
    },
    filename: function (req, file, cb) {
      //   cb(null, file.originalname)
      //   console.log(req.query);
      cb(null, req.query.email + "_profile");
      // cb(null, req.query.email + "_profile." + file.mimetype.split("/")[1]);
    },
  }),
});



module.exports = {profileImageUploader}
