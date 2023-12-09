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

    let query = "select * from tbl_location a inner join tbl_district b ON a.district_id=b.district_id ORDER BY a.location_name";
    console.log(query);

    con.query(query, (err, rows) => {

        if (err) throw err;
        console.log(rows)
        res.send(rows);
    });
});

module.exports = router;