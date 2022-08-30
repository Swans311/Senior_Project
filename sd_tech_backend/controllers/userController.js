const db = require('../config/db.config')
var mysql = require('mysql');
var conn = mysql.createConnection({
  host:db.HOST,
  user:db.USER,
  db:db.DB,
  password:db.PASSWORD,
});
exports.createUser = (req,res) => {
    let data = {email:'dswansey@email.com', password:'pickles', userType:'student'};
    let sql = 'INSERT INTO sdtech.users (email, password, userType) VALUES ("'+data.email+'","'+data.password+'","'+data.userType+'");';
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}
exports.deleteUser = (req,res) => {
    let data = {email:'undefined'}//req.body.email}
    let sql = 'DELETE * FROM sdtech.users WHERE ("email" ="'+data.email+'");';
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}
exports.getUserByEmail = (req,res)=>{
    let data = {email:'email@email.com'}//req.body.email}
    let sql = 'SELECT * FROM sdtech.users WHERE "email" ="'+data.email+'";';
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.getUsers = (req,res) =>{
    let data = {}
    let sql = 'SELECT * FROM sdtech.users;';
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.validateUser = (req,res) =>{
    //let data={email:req.body.email, password:req.body.password}
    let data={email:'email@email.com', password:'password'}
    let sql = 'SELECT * FROM sdtech.users WHERE email = "'+data.email+'" AND password = "'+data.password+'";';
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':true}));
    });
}