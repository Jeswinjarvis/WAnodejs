var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let con = mysql.createConnection({
    host: 'b5qhwegqxj5v6ln5akuh-mysql.services.clever-cloud.com',
    user: 'uaq5xlyvfasa4jbh',
    password: 'mGmRutceIS3fNzoW0eXe',
    database: 'b5qhwegqxj5v6ln5akuh'
});

// Display Customer Name
router.post('/customername', (req, res) => {
    let name = req.body.cname;
    let select = `select customer_name from tbl_customerregistration where customer_id ='${name}'`;
    con.query(select , (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

// Display corresponding district location Name
router.post('/locationview', (req, res) => {
    let id = req.body.id;
    let select = `select * from  tbl_location where district_id='${id}'`;
    con.query(select, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

// Register the Data to the database


router.post('/regnewconnection', (req, res) => {
    let customerid = req.body.customerid;
    let districtid = req.body.district;
    let locationid = req.body.location;
    let housename = req.body.housename;
    let housearea = req.body.housearea;
    let buildingno = req.body.buildingno;
    let aadharno = req.body.aadharno;
    let pincode = req.body.pincode;
    let date = req.body.date;
    let connectiontypeid = req.body.connectiontype;
    let consumerno = 0;
    let amount = 0;
    let status = 'Registred';

    let qry = `insert into tbl_newconnection(customer_id,district_id,location_id,housename,housearea,buildingno,aadharno,pincode,applieddate,connectiontypeid,consumer_number,amount,status) 
    values('${customerid}','${districtid}','${locationid}','${housename}','${housearea}','${buildingno}','${aadharno}','${pincode}','${date}','${connectiontypeid}','${consumerno}','${amount}','${status}')`;
    con.query(qry, (err, result) => {
        if (err) throw err;
        res.send({message: 'success'});
    })
})


// Customer Side new connection Data View Code

router.post('/customerconnectionregview', (req, res) => {
    let cusid = req.body.customerid;
    let select = `SELECT * FROM tbl_newconnection a JOIN tbl_customerregistration b JOIN tbl_district c JOIN tbl_location d JOIN tbl_connectiontype e ON (a.location_id = d.location_id) AND (a.district_id = c.district_id) AND (a.customer_id = b.customer_id) AND (a.connectiontypeid = e.connectiontype_id) WHERE a.customer_id ='${cusid}'`;
    con.query(select, (err, result) => {
        console.log(result);
        if (err) throw err;
        res.send(result);
    })
})


// Admin Side New Connection View Code

router.get('/adminconnectionregview', (req, res) => {
    let select = `SELECT * FROM tbl_newconnection a JOIN tbl_customerregistration b JOIN tbl_district c JOIN tbl_location d JOIN tbl_connectiontype e ON (a.location_id = d.location_id) AND (a.district_id = c.district_id) AND (a.customer_id = b.customer_id) AND (a.connectiontypeid = e.connectiontype_id) where a.status = 'Registred'`;
    con.query(select, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

// Admin Accept / Reject The Connection

router.post('/acceptconnection', (req, res) => {
    let id = req.body.cid;
    let status = req.body.status;
    if(status === 'Accepted'){
        let update = `update tbl_newconnection set status = '${status}' where customer_id = '${id}'`;
        con.query(update, (err, result) => {
            if(err) throw err;
            res.send({message : 'updated'});
        })
    }else if(status === 'Rejected'){
        let update = `update tbl_newconnection set status = '${status}' where customer_id = '${id}'`;
        con.query(update, (err, result) => {
            if(err) throw err;
            res.send({message : 'updated'});
        })
    }
});

// Admin Side View Accepted Customer Details

router.get('/adminacceptedcustomerview', (req, res) => {
    let select = `SELECT * FROM tbl_newconnection a JOIN tbl_customerregistration b JOIN tbl_district c JOIN tbl_location d JOIN tbl_connectiontype e ON (a.location_id = d.location_id) AND (a.district_id = c.district_id) AND (a.customer_id = b.customer_id) AND (a.connectiontypeid = e.connectiontype_id) where a.status = 'Accepted'`;
    con.query(select, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

// Admin Side View Rejected Customer Details

router.get('/adminrejectedcustomerview', (req, res) => {
    let select = `SELECT * FROM tbl_newconnection a JOIN tbl_customerregistration b JOIN tbl_district c JOIN tbl_location d JOIN tbl_connectiontype e ON (a.location_id = d.location_id) AND (a.district_id = c.district_id) AND (a.customer_id = b.customer_id) AND (a.connectiontypeid = e.connectiontype_id) where a.status = 'Rejected'`;
    con.query(select, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

// Customer Connection Delete Code

router.post('/connectiondelete', (req, res) => {
    let applicationid = req.body.data;
    let deleteqry = `DELETE FROM tbl_newconnection WHERE application_id= '${applicationid}'`;
    con.query(deleteqry, (err, result) => {
        if(err) throw err;
        res.send({ message : 'Deleted'});
    })
})

// Customer side check customer have an existing connection

router.post('/checkconnection', (req, res) => {
    let customerid = req.body.customerid;
    let check = `select * from tbl_newconnection where customer_id = '${customerid}'`;
    con.query(check, (err, result) => {
        if(err) throw err;
        if(result != ''){
            res.send({ message : 'connectionExist'});
        }else{
            res.send({ message : 'Not Exist'});

        }
    })
})

// Admin Side Paid Customer Details in the payment Dropdown section
router.get('/paidcustomerdetailsview', (req, res) => {
    let select = `SELECT * FROM tbl_newconnection a JOIN tbl_customerregistration b JOIN tbl_district c JOIN tbl_location d JOIN tbl_connectiontype e ON (a.location_id = d.location_id) AND (a.district_id = c.district_id) AND (a.customer_id = b.customer_id) AND (a.connectiontypeid = e.connectiontype_id) where a.status = 'Paid'`;
    con.query(select, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})



module.exports = router;
