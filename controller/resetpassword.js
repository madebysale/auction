const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../db_conncetion').promise();



exports.resetpassword = async(req,res,next)=>{
     
    // const [row]= await conn.execute(
    //     "SELECT `email`, FROM `user` WHERE `email`=?",
    //     [req.body.email]
    //   );
    
      if(req.body.password===""){
        res.send('invalid password')
        
      }

      else{
        const [row] = await conn.execute(
          "SELECT * FROM `user` WHERE `email`=?",
            [req.body.email]
          );
           console.log(row[0].password)
        
           const match = await bcrypt.compare(req.body.password,row[0].password)
              console.log(match)
            if(match){
                  res.send("new password can not same as old password")
            }
            else{
              
              
              const hashPass = await bcrypt.hash(req.body.password, 12);
               console.log(req.body.password)
              const [row] =await conn.execute(
                "UPDATE user SET password = \'" +hashPass+ "\' WHERE email=?",
                [req.body.email]
              )
              res.send("password changed")
            }


           
          

          

         
        }
      
      
     
}