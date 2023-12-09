var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'water-authority'
});

router.post('/initialamount', (req, res) => {
    let amount = req.body.amount;
    let customerid = req.body.customerid;
    let consumerno = req.body.consumerno;
    let select = `select * from tbl_newconnection where customer_id = '${customerid}' OR consumer_number='${consumerno}'`;
    con.query(select, (er, resu) => {
        if (amount == resu[0].amount) {
            res.send({ message: 'already-paid' })
            
        }else if(consumerno == resu[0].consumer_number){
            res.send({ message: 'consumernorepeated'});
        }else {
            let update = `update tbl_newconnection set amount = '${amount}', consumer_number='${consumerno}' , status='Paid' where customer_id = '${customerid}'`;
            con.query(update, (err, result) => {
                if (err) throw err;
                res.send({ message: 'payed' })
            })
        }
    })
})

router.post('/previousbilldata', (req, res) => {
    let consumerno = req.body.conid;
    console.log(consumerno);
    let select = `select * from tbl_monthlyreading where bill_id IN (SELECT MAX(bill_id) FROM tbl_monthlyreading WHERE consumer_no='${consumerno}');`
    con.query(select, (err, result) => {
        if(err) throw err;
        res.send(result);
        console.log(result);
    })
})

router.post('/connectionamountdetails', (req, res) => {
    let connectiontype = req.body.contype;
    let select = `select * from tbl_connectiontype where connectiontype_id = '${connectiontype}'`;
    con.query(select, (err, result) => {
        if(err) throw err;
        res.send(result);
        console.log(connectiontype)
    })
})

router.post('/submitgenaratedbilltodb', (req, res) => {
    let consumernumber = req.body.consumernumber;
    let previousbilldate = req.body.previousbilldate;
    let previousreading = req.body.previousreading;
    let Currentreading = req.body.Currentreading;
    let monthreading = req.body.monthreading;
    let billamount = req.body.billamount;
    let date = req.body.date;
    let dueDate = req.body.dueDate;
    let fine = req.body.fine;
    let billnumber = req.body.billnumber;
    let status = 'Genarated';
    let select = `SELECT bill_number from tbl_monthlyreading WHERE bill_number='${billnumber}'`;
    // console.log('Bill number',billnumber);


    
    con.query(select, (error, val) => {
        if (error) throw error;
        // console.log(val);
        if (val == ''){
            let insert = `insert into tbl_monthlyreading (bill_number,consumer_no,previous_bill_date,previous_reading,bill_date,due_date,current_reading,monthlyreading,extra_amount,bill_amount,status) 
            values(?,?,?,?,?,?,?,?,?,?,?)`;
            con.query(insert, [billnumber,consumernumber,previousbilldate,previousreading,date,dueDate,Currentreading,monthreading,fine,billamount,status])
            // console.log(insert);
                
                res.send({message : 'success'})
        }else{
            res.send({message : 'genbillno'});
        }
    })
})



module.exports = router;
