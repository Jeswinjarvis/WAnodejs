var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "water-authority"
});

router.get('/', (req, res, next) => {

    let query = 'SELECT * FROM tbl_district';
    console.log(query);

    con.query(query, (err, rows) => {

        if (err) throw err;
        res.send(rows);
    });
});

module.exports = router;