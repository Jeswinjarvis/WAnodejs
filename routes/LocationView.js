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

    let query = "select * from tbl_location a inner join tbl_district b ON a.district_id=b.district_id ORDER BY a.location_name";
    console.log(query);

    con.query(query, (err, rows) => {

        if (err) throw err;
        console.log(rows)
        res.send(rows);
    });
});

module.exports = router;