const conn = require("../db_conncetion").promise();


exports.listcategory = async (req, res, next) => {

     try{
      
      const [row]= await conn.execute(
        "SELECT * FROM category LIMIT 6",
    
        
      );


      res.send(row)
                     
    
   
  

     }
        
   
     catch(err){
      next(err)
     }
  







}