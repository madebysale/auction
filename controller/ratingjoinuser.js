const conn =require('../db_conncetion').promise();


exports.ratingjoinuser= async (req, res, next) => {

    try{
   
        const [row] = await conn.execute(
            
        "select * FROM rating_table  LEFT JOIN user ON rating_table.rating_by = user.id ORDER BY user.id"
          );
  

          res.send(row)

    }
    

    catch(err){
        next(err)
    }


}