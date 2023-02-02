const conn = require('../db_conncetion').promise();


exports.mybid = async (req, res, next) => {

    try{
        const [row]= await conn.execute(
            "select * from bid INNER JOIN auction_table ON bid.auction_id=auction_table.id INNER JOIN user ON bid.bid_to = user.id AND bid.bid_by = user.id ORDER BY bid.id"
            );
          res.send(row)

    }
    catch(err){
        next(err)
    }

}