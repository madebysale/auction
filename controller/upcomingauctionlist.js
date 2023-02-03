const conn = require("../db_conncetion").promise();



exports.upcomingauctionlist = async(req,res,next)=>{

if(req.body.Bid_start_time===""){
    res.send({message:"give date"})
}

else{
  
    const[row] = await conn.execute(
        'SELECT * FROM auction_table WHERE Bid_start_time =?',
        [req.body.Bid_start_time]
        
    )
   console.log(row)

   if(row.length ==0){
    res.send(
        {message:"not available"})
   }





    else{
        
        const[row]=await conn.execute(
            'select * FROM auction_table WHERE Bid_start_time >\"'+req.body.Bid_start_time+'\"'
            // [
            //     req.body.Bid_start_time
            // ]
        )
        console.log(row[0].id)
        res.send(row)
    }



}



}