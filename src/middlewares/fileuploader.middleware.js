const multer = require("multer");
class FileUploader {
  static profileImage = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public");
      },
      filename: function (req, file, cb) {
        //   cb(null, file.originalname)
        //   console.log(req.query);
        // cb(null, req.query.user_id + "_profile");
        cb(null, req.query.user_id + "_profile." + file.mimetype.split("/")[1]);
      },
    }),
  });
}

module.exports = FileUploader;
