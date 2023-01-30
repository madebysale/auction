const express = require('express');
const routes = require('./routes');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require("cors");


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));






app.use(express.json());
app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

// app.post ('/forgot-password',async(req,res)=>{
//   const{email}=req.body;
//   res.send(email)

//   try{
//       const olduser =await user.findOne({email});
//       if(user.email){
//           return res.send("user not exitsts");
//       }

//       const secret = JWT_SECRET+ olduser.password;
//       const token = jwt.sign({email:olduser.email,id:olduser._id},secret,{
//           expiresIn:"5m",
//       })
//       const link =`http://localhost:5000/reset-password/${olduser._id}/${token}`;
//       console.log(link)
      
//   }
//   catch(error){

//   }
// })



// app.get('/reset-password/:id/:token',async(req,res)=>{
//    const{id,token}=req.params;
//    console.log(req.params)
//    const olduser =await user.findOne({email});
//    if(!olduser){
//        return res.send("user not exitsts");
 
//    }
//    req.send("done")
// })




app.listen(5000,() => console.log('Server is running on port 5000'));