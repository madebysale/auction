const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../db_conncetion').promise();


exports.login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT * FROM `user` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        }

        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if(!passMatch){
            return res.status(422).json({
                message: "Incorrect password",
            });
        }

        const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        return res.json({
            token:theToken
        });

    }
    catch(err){
        next(err);
    }
}


 



// exports.loginWithPhoneOtp = async (req, res, next) => {
//     try {
  
//       const { phone } = req.body;
//       const user = await User.findOne({ phone });
  
//       if (!user) {
//         next({ status: 400, message: PHONE_NOT_FOUND_ERR });
//         return;
//       }
  
//       res.status(201).json({
//         type: "success",
//         message: "OTP sended to your registered phone number",
//         data: {
//           userId: user._id,
//         },
//       });
  
//       // generate otp
//       const otp = generateOTP(6);
//       // save otp to user collection
//       user.phoneOtp = otp;
//       user.isAccountVerified = true;
//       await user.save();
//       // send otp to phone number
//       await fast2sms(
//         {
//           message: `Your OTP is ${otp}`,
//           contactNumber: user.phone,
//         },
//         next
//       );
//     } catch (error) {
//       next(error);
//     }
//   };
  








// exports.verifyPhoneOtp = async (req, res, next) => {
//     try {
//       const { otp, userId } = req.body;
//       const user = await User.findById(userId);
//       if (!user) {
//         next({ status: 400, message: USER_NOT_FOUND_ERR });
//         return;
//       }
  
//       if (user.phoneOtp !== otp) {
//         next({ status: 400, message: INCORRECT_OTP_ERR });
//         return;
//       }
//       const token = createJwtToken({ userId: user._id });
  
//       user.phoneOtp = "";
//       await user.save();
  
//       res.status(201).json({
//         type: "success",
//         message: "OTP verified successfully",
//         data: {
//           token,  
//           userId: user._id,
//         },
//       });
//     } catch (error) {
//       next(error);
//     }
//   };
  