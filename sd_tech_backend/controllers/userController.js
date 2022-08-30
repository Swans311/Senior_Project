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
        res.send(JSON.stringify({'status':200, 'error':null, 'response':data}));
    });
}