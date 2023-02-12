const conn = require("../db_conncetion").promise();



exports.auctiondetail= async (req, res, next) => {
   

 
    const [row]=await conn.execute("SELECT name, count(auction_id)as count, max(last_biding_time),current_bid from bid left join auction_table on bid.auction_id=auction_table.id group by auction_id LIMIT 3")
   
   

     
    // var row2 =[row,row1]
     

    // row2.map(item=>{
    //   return  item== item.auction_id
        
    // })
    
    
    res.send(row)
    
 
     }
 
     


