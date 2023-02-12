const { validationResult } = require("express-validator");

const conn = require("../db_conncetion").promise();

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media_upload");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    return cb(null, `${"media_type"}${Date.now()}${"."}${extension}`);
  },
});
var uploadSingle = multer({ storage: storage }).any();

exports.addoccasion_media = async (req, res, next) => {
  uploadSingle(req, res, function (err) {
    try {
      var media_type = "";

      if (req.files) {
        for (i = 0; i < req.files.length; i++) {
          if (req.files[i].fieldname == "media_type") {
            media_type = req.files[i].filename;
          }
        }
      }

      console.log(media_type);
      if (err) {
        res.json({ error_code: 1, err_desc: err });
      }

      conn
        .execute(
          "INSERT INTO occasion_media (category_id,media_name,media_path,media_type) VALUES(?,?,?,?)",
          [
            req.body.category_id,
            req.body.media_name,
            req.body.media_path,
            media_type,
          ]
        )
        .then((response) => {
          res.send({
            data: response,
            message: "media added",
          });
        })
        .catch((err) => {});

      //   if (rows.affectedRows === 1) {
      //       return res.status(201).json({
      //           message: "The user has been successfully inserted.",
      //       });
      //   }
    } catch (err) {
      next(err);
      console.log(err);
    }
  });
};
