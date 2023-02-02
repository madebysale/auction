const conn = require("../db_conncetion").promise();



exports.deleteslider = async(req,res,next)=>{

if(req.body.id===""){
    res.send("give id")
}

else{
  
    const[row] = await conn.execute(
        'SELECT * FROM home_slider WHERE id =?',
        [req.body.id]
        
    )
   console.log(row)

   if(row.length ==0){
    res.send("invalid id")
   }





    else{
        // console.log(row[0].id)
        const[row]=await conn.execute(
            `DELETE  FROM home_slider WHERE id =${req.body.id}`,
            [
                req.body.id
            ]
        )
        res.send('delete sucessfully')
    }



}



}