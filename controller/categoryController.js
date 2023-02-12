const { validationResult } = require("express-validator");
const conn = require("../db_conncetion");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    return cb(null, `${"category_icon"}${Date.now()}${"."}${extension}`);
  },
});
var uploadSingle = multer({ storage: storage }).any();

exports.addcategory = async (req, res, next) => {
  uploadSingle(req, res, function (err) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      console.log(req.body);
      console.log(icon);
      conn.execute("SELECT * FROM `category` WHERE name=? && type =?", [
        req.body.name,
        req.body.type,
      ]);

      //   if (row.length > 0) {
      //     console.log(row[0].name);
      //     console.log(row[0].type);
      //     return res.status(201).json({
      //       message: "The name & type already in use",
      //     });
      //   }

      var icon = "";
      if (req.files) {
        for (i = 0; i < req.files.length; i++) {
          if (req.files[i].fieldname == "category_icon") {
            icon = req.files[i].filename;
          }
        }
      }

      console.log(icon);
      if (err) {
        res.json({ error_code: 1, err_desc: err });
      }

      var mydate = new Date(req.body.createdDate);
      var mydate1 = new Date(req.body.updatedDate);

      if (icon) {
      }
      conn.execute(
        "INSERT INTO `category`(`name`,`type`,`category_status`,`createdDate`,`updatedDate`,`category_icon`) VALUES(?,?,?,?,?,?)",
        [
          req.body.name,
          req.body.type,
          req.body.category_status,
          mydate,
          mydate1,
          icon,
        ]
      );

      res.status(201).json({
        message: "The user has been successfully inserted.",
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  });
};

exports.getcategory = async (req, res, next) => {
  try {
    const [row] = await conn.execute("SELECT * FROM category WHERE name =?", [
      req.body.name,
    ]);
    if (req.body.name === "") {
      return res.json({
        message: "give category name",
      });
    } else if (row.length == 0) {
      res.send({
        message: "inavild category name",
      });
    } else {
      res.send(row);
    }
  } catch (err) {
    next(err);
  }
};

exports.listcategory = async (req, res, next) => {
  try {
    const [row] = await conn.execute("SELECT * FROM category LIMIT 6");

    res.send(row);
  } catch (err) {
    next(err);
  }
};

const conn = require("../db_conncetion").promise();

exports.mylistcategory = async (req, res, next) => {
  try {
    const [row] = await conn.execute(
      "select * FROM category  LEFT JOIN auction_table ON category.id = auction_table.id ORDER BY category.id"
    );

    res.send(row);
  } catch (err) {
    next(err);
  }
};
