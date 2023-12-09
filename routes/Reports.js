var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'water-authority'

});

    router.post('/monthlyreadingduedatereport', (req,res)=>{
        let fromdate = req.body.fromdate;
        let todate = req.body.todate;
        let select= `SELECT * FROM tbl_monthlyreading WHERE bill_date BETWEEN '${fromdate}' AND '${todate}' AND status='Paid'`;
        con.query(select, (err,data)=>{
            if(err) throw err;
            res.send(data);
        })
    });

router.get('/initialamountPaidCustomerReport', (req, res) =>{
    let select= `SELECT * FROM tbl_newconnection a JOIN tbl_customerregistration b JOIN tbl_location c JOIN tbl_district d JOIN tbl_connectiontype e ON (a.customer_id=b.customer_id) AND (a.location_id=c.location_id) AND (a.district_id=d.district_id) AND (a.connectiontypeid=e.connectiontype_id) WHERE a.status='Paid'`;
    con.query(select, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
});

router.get('/consumerdetailsreport', (req,res) =>{
    let select="SELECT * FROM tbl_customerregistration a JOIN tbl_newconnection b JOIN tbl_district c JOIN tbl_location d JOIN tbl_connectiontype e ON (a.customer_id=b.customer_id) AND (b.district_id=c.district_id) AND (b.location_id=d.location_id) AND (b.connectiontypeid=e.connectiontype_id);";
    con.query(select,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })
})




// SELECT * FROM tbl_customerregistration a JOIN tbl_newconnection b ON (a.customer_id=b.customer_id);




module.exports = router;