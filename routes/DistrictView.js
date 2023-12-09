var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'b5qhwegqxj5v6ln5akuh-mysql.services.clever-cloud.com',
    user: 'uaq5xlyvfasa4jbh',
    password: 'mGmRutceIS3fNzoW0eXe',
    database: 'b5qhwegqxj5v6ln5akuh'
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