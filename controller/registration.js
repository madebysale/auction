const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../db_conncetion').promise();
// const { Auth, LoginCredentials } = require("two-step-auth");
const nodemailer = require('nodemailer');



exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(201).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `email` FROM `user` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);
        // const hashconPass = await bcrypt.hash(req.body.password, 12);


        const [rows] = await conn.execute('INSERT INTO `user`(`fullname`,`email`,`mobileno`,`password`) VALUES(?,?,?,?)',[
            req.body.fullname,
            req.body.email,
            req.body.mobileno,
            hashPass
           
           
        ]);

      

        var Transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'madebysale.impetrosys@gmail.com',
              pass: 'impetrosys@123'
            }
          });
           console.log(req.body.id)

          var link = "https://" + req.get('host') + "/verify?id=" + (req.body.id) + "&code=" + 12345;
        console.log(req.body.mobileno);
var Options = {
from: 'madebysale.impetrosys@gmail.com',
to: 'aruntihaiya001@gmail.com',
subject: "Please Verify your Email account",
html: "Hi " + req.body.mobileno + ",<br>We just need to verify your email address before you can access SOUNDCHATRADIO APP.<br> Please Click on the link to verify your email address.<br><a href=" + link + ">Click here to verify</a><br><br>Thanks! &#8211; The SoundChatRadio team"
}

Transport.sendMail(Options, function (error, response) {
if (error) {
console.log(JSON.stringify(error));
// console.log(error)

} else {
console.log("Message sent: " + JSON.stringify(response));
// console.log(response)
}
});

 if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "registration successfully.",
            });
        }


    }catch(err){
        next(err);
    }

   
        }