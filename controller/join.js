const conn = require("../db_conncetion").promise();


exports.join= async (req, res, next) => {
    try{
        const [row]= await conn.execute(
        "SELECT *  FROM category INNER JOIN auction ON category.id = auction.category_id INNER JOIN occasion_media ON category.id = occasion_media.category_id ODER by category.id",
            );
          res.send(row)

    }

//     SELECT *
//   FROM category
//   INNER JOIN auction
//   ON table1.id = table2.id
//   INNER JOIN table3
//   ON table2.id = table3.id;


    catch(err){
       next(err)
    }
  

}