const conn = require("../db_conncetion").promise();


exports.getbid = async (req, res, next) => {

     try{
      
      const [row]= await conn.execute(
        "SELECT * FROM bid WHERE bid_by=?&&bid_to",
        [req.body.bid_by,req.body.bid_to]
        
      );
         if(req.body.bid_to=== ''||req.body.bid_by===""){
          return res.json({
            message: "give atleast one parameter bid_by/bid_to"
          });

         
      }  

      
       else if(row.length==0){
      
       
        res.send({
          message:"inavild value"
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