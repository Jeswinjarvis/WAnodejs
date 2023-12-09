var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let con = mysql.createConnection({
    host: 'b5qhwegqxj5v6ln5akuh-mysql.services.clever-cloud.com',
    user: 'uaq5xlyvfasa4jbh',
    password: 'mGmRutceIS3fNzoW0eXe',
    database: 'b5qhwegqxj5v6ln5akuh'
});

// Customer side view

router.post('/monthlypaymentcustomerview', (req, res) => {
    let customerid = req.body.cid;
    let select = `SELECT *, a.status as 'monthlystatus' FROM tbl_monthlyreading a JOIN tbl_newconnection b JOIN tbl_customerregistration c JOIN tbl_connectiontype d ON a.consumer_no=b.consumer_number AND b.connectiontypeid=d.connectiontype_id AND b.customer_id=c.customer_id where a.bill_id IN (SELECT MAX(bill_id) FROM tbl_monthlyreading WHERE consumer_no IN (SELECT consumer_number FROM tbl_newconnection WHERE customer_id='${customerid}') and status='Genarated')`;
    con.query(select, (err, result) => {
        if (err) throw err;
        if (result != '') {
            res.send(result);
        } else {
            console.log('result',result);
            res.send({ message : 'paid' });
        }
    })
})


// Customer Paying the Monthly Amount
router.post('/customerpayingthemonthlyamount', (req, res) => {
    let consumerno = req.body.consumerno;
    let billno = req.body.billno;
    let currentdate = req.body.currentdate;
    let amount = req.body.monthlyamount;
    let status = 'Paid';
    let insert = `insert into tbl_payment (consumer_number,bill_no,payment_date,amount) values('${consumerno}','${billno}','${currentdate}','${amount}')`;
    con.query(insert, (err, result) => {
        if (err) throw err;
        if (result != '') {
            let updatequery = `update tbl_monthlyreading set status='${status}' where bill_number='${billno}'`;
            con.query(updatequery, (err, result) => {
                if (err) throw err;
            })
        }
        res.send({ message: 'success' });
    })
})

router.post('/reciept', (req, res) => {
    let customerid = req.body.cid;
    console.log(customerid);
    let select = `SELECT * FROM tbl_connectiontype a JOIN tbl_customerregistration b JOIN tbl_monthlyreading c JOIN tbl_newconnection d ON (a.connectiontype_id=d.connectiontypeid) AND (b.customer_id=d.customer_id) AND (d.consumer_number=c.consumer_no) WHERE c.bill_id IN (SELECT MAX(bill_id) FROM tbl_monthlyreading) AND b.customer_id='${customerid}'`;
    con.query(select, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

router.post('/paymentReciept', (req,res) => {
    let customerid= req.body.cid;
    console.log(customerid);
    let query = `SELECT *, a.status as 'monthlystatus' FROM tbl_monthlyreading a JOIN tbl_newconnection b JOIN tbl_customerregistration c JOIN tbl_connectiontype d ON a.consumer_no=b.consumer_number AND b.connectiontypeid=d.connectiontype_id AND b.customer_id=c.customer_id where a.bill_id IN (SELECT bill_id FROM tbl_monthlyreading WHERE consumer_no IN (SELECT consumer_number FROM tbl_newconnection WHERE customer_id='${customerid}') and status='Paid')`;
    con.query(query, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
});

router.post('/paymentRecieptdownload', (req,res) => {
    let billno= req.body.billno;
    console.log(billno);
    let query = `SELECT *, a.status as 'monthlystatus' FROM tbl_monthlyreading a JOIN tbl_newconnection b JOIN tbl_customerregistration c JOIN tbl_connectiontype d ON a.consumer_no=b.consumer_number AND b.connectiontypeid=d.connectiontype_id AND b.customer_id=c.customer_id where a.bill_id IN (SELECT bill_id FROM tbl_monthlyreading WHERE bill_number='${billno}');`;
    con.query(query, (err, result) => {
        console.log(result);
        if(err) throw err;
        res.send(result);
    })
})

module.exports = router;