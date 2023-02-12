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
   return  cb(null,`${'image'}${Date.now()}${'.'}${extension}`)
  }
  
})
var uploadSingle = multer({ storage: storage }).any();


 exports.addslider =  async (req, res, next) => {
  uploadSingle(req, res, function (err) {
  try {

      var mobileimage = "";

  

      if (req.files) {
      
        for (i = 0; i < req.files.length; i++) {
          if (req.files[i].fieldname == 'image') {
            mobileimage = (req.files[i].filename);
                                                      
          }
        }
      }

      console.log(mobileimage)
      if (err) {
        res.json({ error_code: 1, err_desc: err });
      }
       

    
                      
    
  

     

    
   if(mobileimage){
     conn.execute( 'INSERT INTO home_slider (title,discription,linked,image) VALUES(?,?,?,?)',
      [
      req.body.title,
      req.body.discription,
      req.body.linked,
      mobileimage
      ]
    ).then(responce=>{
      res.send({
        data:responce,
        message: "slider added successfully",
         
      });
    })
      console.log(req.body.linked)
  
    
    
   }
    
  } 
  catch (err) 
  {
    next(err);
    console.log(err)
  }
});
};
