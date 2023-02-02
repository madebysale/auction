const {validationResult} = require('express-validator');
const conn = require("../db_conncetion").promise();

exports.addcategory = async (req, res, next) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
  }

  try{
     console.log(req.body.name)
      const [row] = await conn.execute(
          "SELECT * FROM `category` WHERE name=? && type =?",
          [req.body.name,req.body.type]
        );
         
      if (row.length > 0) {
        console.log(row[0].name)
         console.log(row[0].type)
          return res.status(201).json({
              message: "The name & type already in use",
          }
          );
      }
      


      // const hashPass = await bcrypt.hash(req.body.password, 12);
      // const hashconPass = await bcrypt.hash(req.body.password, 12);
      

    var mydate = new Date(req.body.createdDate);
    var mydate1 = new Date(req.body.updatedDate);


      const [rows] = await conn.execute('INSERT INTO `category`(`name`,`type`,`category_status`,`createdDate`,`updatedDate`,`category_image`) VALUES(?,?,?,?,?,?)',[
          req.body.name,
          req.body.type,

          req.body.category_status,
          mydate,
          mydate1,
          req.body.category_image
          
          
         
         
      ]);

      if (rows.affectedRows === 1) {
          return res.status(201).json({
              message: "The user has been successfully inserted.",
          });
      }


  }catch(err){
      next(err);
      console.log(err)
  }



































  //   const categories =  await conn.execute(
  //     "SELECT * FROM `category` WHERE `name`=?",
  //     [req.body.name,req.body.type]
  //   )
    
  //    if(req.body.name === "" || req.body.type === "" || req.body.createdDate === "" || req.body.updatedDate === "")
  //    {
  //    res.send("invalid entry")

  //     }

  //    else if(categories.length>0){
  //     res.send("already use")
  //    }


  //  else{

  //   var mydate = new Date(req.body.createdDate);
  //   var mydate1 = new Date(req.body.updatedDate);
  //   console.log(mydate);

  //   try {
  //     var status = Number(req.body.category_status);

  //     const categories = await conn.execute(
  //       "INSERT INTO `category`(`name`,`type`,`category_status`,`createdDate`,`updatedDate`) VALUES(?,?,?,?,?)",
  //       [req.body.name, req.body.type, status, mydate, mydate1]
  //     );

  //     res.send("done");
  //   } catch (err) {
  //     res.send(err);
  //     console.log(err);
  //   }
  // }
   }


  //     const [category]= await conn.execute(
  //     "SELECT `name` FROM `category` WHERE `name`=?",
  //     [req.body.name]

  //   );
  //   console.log([category])

//     if (rows.affectedRows === 1) {
//         return res.status(201).json({
//             message: "The user has been successfully inserted.",
//         });
//     }

// }catch(err){
//     next(err);
// }
