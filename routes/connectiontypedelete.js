var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'water-authority'

});


router.post('/', (req, res) => {
    let conid = req.body.connectionid;
    console.log(conid);
    let que = `delete from tbl_connectiontype where connectiontype_id='${conid}'`;
    con.query(que, (err, resu) => {
        if (err) throw err;
        res.send({message: "success"});
    });
});

module.exports = router;
