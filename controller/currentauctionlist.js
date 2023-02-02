const conn = require("../db_conncetion").promise();



exports.currentauctionlist = async(req,res,next)=>{

if(req.body.Bid_start_time===""){
    res.send("give date")
}

else{
  
    const[row] = await conn.execute(
        'SELECT * FROM auction_table WHERE BId_end_time =?',
        [req.body.Bid_start_time]
        
    )
   console.log(row)

   if(row.length ==0){
    res.send("invalid time")
   }





    else{
        // console.log(row[0].id)
        const[row]=await conn.execute(
            'select * FROM auction_table WHERE BId_end_time >\"'+req.body.Bid_start_time+'\"'
            // [
            //     req.body.Bid_start_time
            // ]
        )
        res.send(row)
    }



}



}