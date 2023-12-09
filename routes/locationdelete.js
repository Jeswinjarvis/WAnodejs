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
let strquery = `DELETE FROM tbl_location where location_id='${locationid}'`;
con.query(strquery, (err, rows) => {
if (err) throw err;
res.send({ message: 'Success' })
});
});
module.exports = router;