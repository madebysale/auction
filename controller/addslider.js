const { validationResult } = require("express-validator");

const conn = require("../db_conncetion").promise();
//
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload")
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null,'image'+'.'+extension)
  }
})

var uploadSingle = multer({ storage: storage }).any();

var mobileimage = "";
exports.addslider =  async (req, res, next) => {
  try {

   
 uploadSingle(req, res, function (err) {
  var mobileimage = "";

      if (req.files) {

     for (i = 0; i < req.files.length; i++) {
          if (req.files[i].fieldname == 'image') {
            mobileimage = (req.files[i].filename);
          }
        }
      }
      
  

      if (err) {
        res.json({ error_code: 1, err_desc: err });
      }
    });
    console.log(req.body)
    const [rows] = await conn.execute('INSERT INTO home_slider (image,discription,linked,title) VALUES(?,?,?,?)',[
        mobileimage,
        req.body.discription,
        req.body.linked,
        req.body.title
       

      ]);

      
  

    res.send({
      message: "slider added successfully",
      
    });
  } catch (err) {
    next(err);
    console.log(err)
  }
};
