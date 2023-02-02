const mysql = require("mysql2");
const multer =require('multer');
const upload = multer({dest:'uploads/'})


const db_connection = mysql
  .createConnection({
    host: "localhost", // HOST NAME
    user: "root", // USER NAME
    database: "auction", // DATABASE NAME
    password: "arun@1997", // DATABASE PASSWORD
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;