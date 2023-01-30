const {validationResult} = require('express-validator');

const conn = require("../db_conncetion").promise();

exports.addoccasion_media= async (req, res, next) => {

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
      


      
      
        // var category_id = Number(req.body.category_id)

      const [rows] = await conn.execute('INSERT INTO occasion_media (category_id,media_name,media_path,media_type) VALUES(?,?,?,?)',[
        req.body.category_id,
          req.body.media_name,

          req.body.media_path,
          req.body.media_type
        
          
          
         
         
      ]);

      res.send(
        {
            message:"media added"
        }
      )

    //   if (rows.affectedRows === 1) {
    //       return res.status(201).json({
    //           message: "The user has been successfully inserted.",
    //       });
    //   }


  }catch(err){
      next(err);
      console.log(err)
  }



}





























