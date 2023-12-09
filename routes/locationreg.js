var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'b5qhwegqxj5v6ln5akuh-mysql.services.clever-cloud.com',
    user: 'uaq5xlyvfasa4jbh',
    password: 'mGmRutceIS3fNzoW0eXe',
    database: 'b5qhwegqxj5v6ln5akuh'
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