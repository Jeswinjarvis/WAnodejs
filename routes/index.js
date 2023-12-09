var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let con = mysql.createConnection({
  host: 'b5qhwegqxj5v6ln5akuh-mysql.services.clever-cloud.com',
  user: 'uaq5xlyvfasa4jbh',
  password: 'mGmRutceIS3fNzoW0eXe',
  database: 'b5qhwegqxj5v6ln5akuh'
});

// Search  Guesy page
router.post('/search', (req, res) => {
  let searchvalue = req.body.value;
  let select = `SELECT * FROM tbl_location WHERE location_name LIKE '${searchvalue}%'`;
  con.query(select, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(searchvalue);
  })
})

// Guest side get count of some  datas 
router.get('/count', (req, res) => {
  let selectlocationcount = `SELECT COUNT(location_id) AS 'location_count' from tbl_location
  UNION
  SELECT COUNT(customer_id) AS 'customer_count' from tbl_customerregistration
  UNION
  SELECT COUNT(application_id) AS 'connection_count' from tbl_newconnection WHERE status='Paid';`;
  con.query(selectlocationcount, (err, locationcount) => {
    console.log(locationcount);
    if(err){
      throw err;
    }
        let zipdata = [{
          'locationcount' : locationcount[0].location_count,
          'customercount' : locationcount[0].customer_count,
          'connectioncount' : locationcount[0].connection_count
        }];
        console.log("Zip : ",zipdata);
        res.send(locationcount);
     
  })
})

router.post('/customermasterpagemonthlylink', (req, res) => {
  let id= req.body.id;
  console.log(id);  
  let query = `SELECT * FROM tbl_monthlyreading WHERE consumer_no IN (SELECT consumer_number FROM tbl_newconnection WHERE customer_id='${id}') AND bill_id IN (SELECT MAX(bill_id) FROM tbl_monthlyreading) AND status=('Genarated' OR 'Paid')`;
  con.query(query, (err, result) => {
    if(err) throw err;
    if(result != ''){
      res.send({message : 'true'});
    }else{
      res.send({message : 'false'});
    }
  })

})

module.exports = router;