const conn = require("../db_conncetion").promise();


exports.getcategory = async (req, res, next) => {

     try{
      
      const [row]= await conn.execute(
        "SELECT * FROM category WHERE name =?",
        [req.body.name]
        
      );
         if(req.body.name=== ''){
          return res.json({
            message: "give category name"
          });

         
      }  

      
       else if(row.length==0){
      
       
        res.send({
          message:"inavild category name"
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