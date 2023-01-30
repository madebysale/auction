const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const { userInfo } = require('os');

const conn = require('../db_conncetion').promise();


const JWT_SECRET ='some super secret...'
exports.forgetpassword = async(req,res,next)=>{
    // const errors = validationResult(req)

     const [row]= await conn.execute(
        "SELECT `email`,`id` FROM `user` WHERE `email`=?",
        [req.body.email]
      );
   
      console.log([row])


    // if(!errors.isEmpty()){
    //     return res.status(422).json({ errors: errors.array() });
    // }

    if(req.body.email===""){
        return res.send('invaild email')
    }
    else if
    (row.length==0){
            return res.send('email is not exit in database')
       
    }

        else{
        //     const secret =JWT_SECRET+req.body.password;
        //   const payload ={
        //     id:row[0].id,
        //     email:row[0].email,
          
        //   }
        //   console.log(payload.email)
        //   console.log(payload.id)
        //     const Token = jwt.sign(payload,secret,{ expiresIn: '1h' });
                


        //       const link =`http://localhost:5000/reset-password/${row[0].email}/${row[0].id}/${Token}`;
        //             console.log(link);
        //             const token ={
        //                 token:link
        //             }
               res.send({
               message: 'reset link sent on your email'});
            

        
          }

    

    
   
    

        // if(){
        //     return res.send('invalid user ')
        // }
        // else{
        //     const secret =JWT_SECRET+req.body.password;
        //   const payload ={
        //     id:req.id,
        //     email:req.email,
        //   }

        //   const Token = jwt.sign(payload,secret,{ expiresIn: '1h' });

        //   const link =`http://localhost:5000/reset-password/${req.id}/${Token}`;
        //         console.log(link);
        //        res.send('plz check your mail');
        // }
          
}