const conn =require('../db_conncetion').promise();


exports.listrating = async (req,res,next) =>{

try{

const[row]= await conn.execute(
    'select * from rating_table'
)
res.send(row)

}
  

catch(err){
    next(err)
}



}