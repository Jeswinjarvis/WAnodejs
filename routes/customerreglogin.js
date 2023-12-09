var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const nodemailer = require("nodemailer"); //Mail variable

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'water-authority'
});

router.post('/otpcheckfun', (req, res)=>{
    let otpnum = req.body.opt;
    let email = req.body.email;
    console.log("Email : ",email,"OTP : ",otpnum);

    const mailOptions = { 
        from: `"H20-HUB", "jeswinj556@gmail.com"`, 
        to: `${email}`, 
        subject: "H20-HUB The Water Authority", 
        html: `For The Consumer Varification the One Time Password(OTP) is :  '${otpnum-972}'`
        }; 
        const transporter = nodemailer.createTransport({ 
        host: "smtp.gmail.com", 
        port: 587, 
        secure: false, 
        auth: { 
        user: "jeswinj556@gmail.com", 
        pass: "pnridvoekalxioul"
        } 
        }); 
        transporter.sendMail(mailOptions, (err, info) => { 
        if(err) 
        console.log("Error  ::  ",err);  
        })

});




router.post('/customerreg', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let number = req.body.number;
    let password = req.body.password;
    let regdate = req.body.regdate;
    let select = `select * from tbl_customerregistration where email='${email}' and password='${password}'`;
    con.query(select, (err, result) => {
        if(err) throw err;
        if(result == ''){
            let create = `insert into tbl_customerregistration (customer_name,email,contact_no,registered_date,password) 
            values('${name}','${email}','${number}','${regdate}','${password}')`;
            con.query(create, (err, resp) => {
                console.log(resp);
                res.send({message: 'Data inserted'})
            })

        }else{
            res.send({message: "insert failed"});
        }
    });


    

});

router.post('/customerlogin', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let loginqry = `select * from tbl_customerregistration where email='${email}' and password='${password}'`;
    con.query(loginqry, (err, result) => {
        if(err) throw err;
        if(result != ''){
        if((email == result[0].email) && (password == result[0].password)){
            res.send(result);
        }else{

            res.send({message: "Password not matching"});

        }
    }else{
        res.send({message: "Password not matching"});
    }
       
        
    });

    
});






module.exports = router;