const conn =require('../db_conncetion').promise();


exports.mylistcategory = async (req, res, next) => {

    try{
   
        const [row] = await conn.execute(
            
        "select * FROM category  LEFT JOIN auction_table ON category.id = auction_table.id ORDER BY category.id"
          );
  

          res.send(row)

    }
    

    catch(err){
        next(err)
    }


}