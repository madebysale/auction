const conn = require("../db_conncetion").promise();


exports.getauction= async (req, res, next) => {

     try{
      
      const [row]= await conn.execute(
        "SELECT * FROM auction WHERE name=? ||userid=?", 
        [req.body.name,req.body.userid]
        
      );
       
         if(req.body.name===''&&req.body.userid===''){
          return res.json({
            message: "give atleast one parameter name or userid"
          }
          );

         
      }  

      
       else if(row.length==0){
      
       
        res.send({
          message:"inavild userid/ name"
        })
       
       }
     


      else{
        res.send(
         row
      );

      }

    
   
  

     }
        
   
     catch(err){
      next(err)
     }
  







}