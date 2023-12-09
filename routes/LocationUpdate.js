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
    let locationid = req.body.locationid;
    let locationname = req.body.locationname;
    let districtid = req.body.district_name;
    let strquery = `UPDATE tbl_location SET location_name='${locationname}',
    district_id='${districtid}' where location_id='${locationid}'`;
    con.query(strquery, (err, rows) => {
        if (err) throw err;
        res.send({ message: 'Success' })
    });
});
module.exports=router;
