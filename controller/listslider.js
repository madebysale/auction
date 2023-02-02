const conn =require('../db_conncetion').promise();


exports.listslider = async (req,res,next) =>{

try{

const[row]= await conn.execute(
    'select * from home_slider'
)
res.send(row)

}
  

catch(err){
    next(err)
}



}