var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "water-authority"
  });

  router.post('/', (req, res,) => {
    
    let Username= req.body.username;
    let Password= req.body.password;
    
   
    let que = `SELECT * FROM tbl_adminlogin where username='${Username}' and password='${Password}'`;
console.log(que);
    con.query(que,(err,result)=>{

        if(err) {console.log(err);}
        if(result != ''){
          if((Username == result[0].username) && (Password == result[0].password)){
            res.send(result);
          }else{
            res.send({message : 'Errormessage'});
          }
        }else{
          res.send({message : 'Errormessage'});
        }
      });
    })

    module.exports = router;
