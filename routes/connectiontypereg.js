var express = require('express');
var router = express.Router();
var mysql = require('mysql');



let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'water-authority'

});



router.post('/', (req, res) => {
    let connectiontypename = req.body.connectiontypename;
    let minimumlitre = req.body.minimumlitre;
    let minimumlitreamount = req.body.minimumlitreamount;
    let extralitreamount = req.body.extralitreamount;
    let query = `select * from tbl_connectiontype where type_name ='${connectiontypename}'`;
    con.query(query, (err, result) => {
        if(err) {
            throw err;
        }
        if(result == ''){
            let dataquery = `insert into tbl_connectiontype(type_name,min_litre,min_price,extra_litre_amount) values(?,?,?,?)`;
            con.query(dataquery, [connectiontypename,minimumlitre,minimumlitreamount,extralitreamount])
            res.send({message: 'success'})
        }else{
            res.send({message: 'Failed'})
        }
    });


    


});




// Connection View  Method

router.get('/connectionview', (req, res) => {
    let select = `select * from tbl_connectiontype`;
    con.query(select, (err, data) =>{
      //  if(err) throw err;
        res.send(data);
    });
});



// connection Type Edit Method

router.get('/connectionedit/:id', (req, res) => {
    let id = req.params.id;
    let select = `select * from tbl_connectiontype where connectiontype_id='${id}'`;
    con.query(select, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});


// ConnectionUpdate Method

router.post('/connectiontypeupdate', (req, res) => {
    let id = req.body.connectionid;
    let connectiontypename = req.body.connectiontypename;
    let minimumlitre = req.body.minimumlitre;
    let minimumlitreamount = req.body.minimumlitreamount;
    let extralitreamount = req.body.extralitreamount;
    let update = `update tbl_connectiontype set type_name='${connectiontypename}' , min_litre='${minimumlitre}' , min_price='${minimumlitreamount}' , extra_litre_amount='${extralitreamount}' where connectiontype_id='${id}'`;
    con.query(update, (err, rows) => {
        if(err) throw err;
        res.send({success: "Success"});
    });

});



// connectiontype Delete

router.post('/connectiontypedelete', (req, res) => {
    let conid = req.body.data;
    console.log(conid);
    let que = `delete from tbl_connectiontype where connectiontype_id='${conid}'`;
    con.query(que, (err, resu) => {
        if (err) throw err;
        res.send({success: "success"});
    });
});


module.exports = router;
