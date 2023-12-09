var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var con = mysql.createConnection({
  host: 'b5qhwegqxj5v6ln5akuh-mysql.services.clever-cloud.com',
  user: 'uaq5xlyvfasa4jbh',
  password: 'mGmRutceIS3fNzoW0eXe',
  database: 'b5qhwegqxj5v6ln5akuh'
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
