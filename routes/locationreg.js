var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",

    password: "",
    database: "water-authority"
});


router.post('/', (req, res, next) => {
    let locationname = req.body.locationname;
    let districtid = req.body.districtid;
    let query = `select * from tbl_location where location_name='${locationname}'`;
    con.query(query, (err, rows) => {
        if (err) throw err;
        if (rows == "") {

            let strquery = `INSERT INTO tbl_location(location_name,district_id) VALUES(?,?)`;



            con.query(strquery, [locationname, districtid])

            if (err) throw err;
            console.log("1 record inserted")
            res.send({ message: 'Success' })
        } else {
            res.send({ message: 'Failed' })
        }
    });


});
module.exports = router;