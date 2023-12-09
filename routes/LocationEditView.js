var express = require('express');
var router = express.Router();

var mysql = require('mysql');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "water-authority"
});

router.post('/', (req, res, next) => {
    let locationid = req.body.id;
    console.log(locationid);
    let query = `select * from tbl_location a inner join tbl_district b ON a.district_id=b.district_id where location_id='${locationid}'`;
    console.log(query);
    con.query(query, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

module.exports = router;