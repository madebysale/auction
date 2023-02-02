const conn = require("../db_conncetion").promise();



exports.updateslider = async(req,res,next)=>{

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
            // console.log(req.body.title)
            'UPDATE home_slider SET title = \" ' +req.body.title +' \" , discription = \" '+req.body.discription+'\" , linked = \"'+req.body.linked+'\" ,image = \" '+req.body.image+'\" WHERE id=?',
            [
            //     req.body.title,
            //     req.body.discription,
            //     req.body.linked,
            //     req.body.image,
                req.body.id





            ]
        )
        res.send('UPDATE sucessfully')
    }



}



}