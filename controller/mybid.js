const conn = require('../db_conncetion').promise();


exports.mybid = async (req, res, next) => {

    try{
        const [row]= await conn.execute(
            "select * from bid LEFT JOIN auction_table ON bid.auction_id=auction_table.id LEFT JOIN user on bid.bid_to = user.id ORDER by bid.id LIMIT 5"
            );
          res.send(row)

    }
    catch(err){
        next(err)
    }

}