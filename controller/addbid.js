const {validationResult} = require('express-validator');

const conn = require("../db_conncetion").promise();

exports.addbid = async (req, res, next) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
  }

  try{
    //  console.log(req.body.name)
    //   const [row] = await conn.execute(
    //       "SELECT * FROM `category` WHERE name=? && type =?",
    //       [req.body.name,req.body.type]
    //     );
         
    //   if (row.length > 0) {
    //     console.log(row[0].name)
    //      console.log(row[0].type)
    //       return res.status(201).json({
    //           message: "The name & type already in use",
    //       }
    //       );
    //   }
      


      // const hashPass = await bcrypt.hash(req.body.password, 12);
      // const hashconPass = await bcrypt.hash(req.body.password, 12);
      

    var last_biding_time = new Date(req.body.last_biding_time);
    var initial_bid = Number(req.body.initial_bid);
    var current_bid = Number(req.body.current_bid);
    var last_bid = Number(req.body.last_bid);
    var occasion_id = Number(req.body.occasion_id);
    var category_id = Number(req.body.category_id);


      const [rows] = await 
      conn.execute('INSERT INTO `bid`(initial_bid,current_bid,last_bid,last_biding_time,occasion_id,category_id,bid_by,bid_to) VALUES(?,?,?,?,?,?,?,?)',[
          initial_bid,
          current_bid,
           last_bid,
          last_biding_time,
          occasion_id,
          category_id,
          req.body.bid_by,
          req.body.bid_to
          
          
         
         
      ]);
         
      // if (rows.affectedRows === 1) {
      //     return res.status(201).json({
      //         message: "The user has been successfully inserted.",
      //     });
      // }

        res.send({
          message:"bid added"
        })


  }catch(err){
      next(err);
      console.log(err)
  }
}

