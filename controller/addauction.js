const conn = require("../db_conncetion").promise();
const {validationResult} = require('express-validator');

exports.addauction = async (req, res, next) => {



    
  const errors = validationResult(req);

  if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
  }

        

    try{

        const [row] = await conn.execute(
            "SELECT * FROM `auction_table` WHERE name=?&& discription=?&& userid =?",
            [req.body.name,req.body.discription,req.body.userid]
          );
          
        if (row.length > 0) {
            console.log(row[0].name);
          console.log(row[0].discription);
          console.log(row[0].userid);
       
            return res.status(201).json({
                message: "The userid & name & discription already in use",
            });
        }




        const createdDate = new Date(req.body.createdDate);
        const updatedDate = new Date(req.body.updatedDate);
        const Bid_start_time = new Date(req.body.Bid_start_time);
        const Bid_end_time = new Date(req.body.BId_end_time);
        const  category_id =Number(req.body.category_id);
        const  userid =Number(req.body.userid);
            
            console.log(Bid_start_time)
            console.log(Bid_end_time)
            // console.log(req.body.category_id)
            console.log(req.body.category_name)
            console.log(createdDate)
            console.log(updatedDate)



        const [rows] = await conn.execute("INSERT INTO  auction_table (name,discription,startingBid,Bid_start_time,BId_end_time,category_id,category_name,Detail,createdDate,updatedDate,userid) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
          [
            req.body.name,
        
            req.body.discription,
             req.body.startingBid,
            Bid_start_time,
            Bid_end_time,
            req.body.category_id,
            req.body.category_name,
            req.body.Detail,
            createdDate,
            updatedDate,
            userid
          ]

        );
        res.send({message:"auction added"});
    }


    catch(err){
        next(err);
        console.log(err)
    }
 
};
