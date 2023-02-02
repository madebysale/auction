const conn = require("../db_conncetion").promise();



exports.rating = async(req,res,next)=>{
try{
          const rating  = Number(req.body.rating)
    const [rows] = await conn.execute('INSERT INTO rating_table (rating,rating_message,rating_by,status,createdDate,updatedDate) VALUES(?,?,?,?,?,?)',[
        rating,
        req.body.rating_message,
        req.body.rating_by,
        req.body.status,
        req.body.createdDate,
        req.body.updatedDate
       

      ]);

      res.send({
        message:"rating added"
      })
}

catch(err){
    next(err)
}
   
}