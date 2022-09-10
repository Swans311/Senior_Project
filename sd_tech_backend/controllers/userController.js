const db = require('../config/db.config')
var mysql = require('mysql');
var conn = mysql.createConnection({
  host:db.HOST,
  user:db.USER,
  db:db.DB,
  password:db.PASSWORD,
});
exports.createUser = (req,res) => {
    let data = {email:req.body.email, password:req.body.password, userType:req.body.userType};
    let sql1 = 'SELECT * FROM sdtech.users WHERE email = "'+data.email+'";';
    let query1 = conn.query(sql1, data, (err,results1)=>{
        if(err) throw err;
        if(results1.length > 0){
            res.send(JSON.stringify({'status':200, 'error':'Email exists', 'response':results1}))
        }
        else{
            let sql = 'INSERT INTO sdtech.users (email, password, userType) VALUES ("'+data.email+'","'+data.password+'","'+data.userType+'");';
            let query = conn.query(sql, data, (err,results)=>{
                if(err) throw err;
                if(results){
                    res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
                }
                else{
                    res.send(JSON.stringify({'status':200, 'error':'An issue occurred', 'response':false}));
                }  
            });        }  
    });
    
}
exports.createStudentUser = (req,res) => {
    let data = {userID : req.body.id, fname:req.body.fname, lname:req.body.lname}
    let sql = 'INSERT INTO sdtech.studentusers (UserID, fname, lname) VALUES ("'+data.userID+'", "'+data.fname+'", "'+data.lname+'");'
    let query = conn.query(sql, data, (err,results) => {
        if(err) throw err;
        if(results){
            res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
        }
        else{
            res.send(JSON.stringify({'status':200, 'error':'An issue occurred', 'response':false}));
        }    
    })
}
exports.createOrganizationUser = (req,res) => {
    let data = {userID : req.body.id, companyName:req.body.organizationName, taxID:req.body.taxID, accountManager: req.body.accountManager}
    let sql = 'INSERT INTO sdtech.organizationusers (userID, companyName, taxID, accountManager) VALUES ('+data.userID+', "'+data.companyName+'", '+data.taxID+', "'+data.accountManager+'");'
    let query = conn.query(sql, data, (err,results) => {
        if(err) throw err;
        if(results){
            res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
        }
        else{
            res.send(JSON.stringify({'status':200, 'error':'An issue occurred', 'response':false}));
        }    
    })
}
exports.updateUser = (req,res) =>{
    let data = {email:'pickles@pickles.com', password:'pickles', userType:'Student'}//should be req.body.var
    let sql = 'UPDATE sdtech.users SET email = "'+data.email+'", password ="'+data.password+'", userType = "'+data.userType+'" WHERE id = 3';//needs to have the actual id to update properly
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
    let data={email:req.body.email, password:req.body.password}
    //let data={email:'email@email.com', password:'password'}
    let sql = 'SELECT * FROM sdtech.users WHERE email = "'+data.email+'" AND password = "'+data.password+'";';
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        //instead of returning true, it should return the getUserInfo S or O based on the userType found at this index
        if(results){
            res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
        }
        else{
            res.send(JSON.stringify({'status':200, 'error':'An issue occurred', 'response':false}));
        }
    });
}

exports.getUserInfoS = (req,res) => {
    let data = req.params.id
    let sql = 'SELECT * FROM sdtech.users INNER JOIN sdtech.studentusers ON users.id = studentusers.userID WHERE id = '+data+'';
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.getUserInfoO = (req,res) => {
    let data = {id:req.params.id}//should be req.body.id
    let sql = 'SELECT * FROM sdtech.users INNER JOIN sdtech.organizationusers ON users.id = organizationusers.userID WHERE userID = '+data.id+'';
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.getScholarshipsByID = (req,res) => {
    let data = {id:req.params.id}
    let sql = 'SELECT * FROM sdtech.scholarship WHERE postedBy = '+data.id+';'
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.getAllScholarships = (req,res) => {
    let sql = 'SELECT * FROM sdtech.scholarship ;'
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.createScholarship = (req,res) => {
    let data = {'postedBy':req.body.id, 'value':req.body.value, 'essayRequired':req.body.essayRequired, 'major':req.body.major, 'ethnicity':req.body.ethnicity, 'description':req.body.description};
    let sql = 'INSERT INTO sdtech.scholarship `postedBy`, `value`, `essayRequired`, `major`, `ethnicity`, `description` VALUES ("'+data.postedBy+'", '+body.value+', '+body.essayRequired+', "'+body.major+'", "'+body.ethnicity+'", "'+body.description+'"));'
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.getApplicationsByUserID = (req,res) => {
    let data = {id:req.body.id}
    let sql = 'SELECT * FROM sdtech.application WHERE studentID = '+data.id+';'
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.getApplicationsByScholarshipID = (req,res) => {
    let data = {id:req.body.id}
    let sql = 'SELECT * FROM sdtech.application WHERE scholarshipID = '+data.id+';'
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.getAllApplications = (req,res) => {
    let sql = 'SELECT * FROM sdtech.application ;'
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.getAppsByScholarship = (req,res) => {
    let data = {id:req.body.id};
    let sql = 'SELECT * FROM sdtech.application INNER JOIN sdtech.scholarship ON application.scholarshipID = scholarship.id WHERE scholarshipID = '+data.id+';'
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.createApplication = (req,res) => {
    let data = {'scholarshipID':req.body.scholarshipID, 'studentID':req.body.studentID, 'essay':req.body.essay, 'winner':null};
    let sql = 'INSERT INTO `sdtech`.`application` (`scholarshipID`, `studentID`, `essay`, `winner`) VALUES ('+req.body.scholarshipID+', '+data.studentID+', '+data.essay+', '+data.winner+');'
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

exports.getCompanies = (req,res) => {
    let sql = 'SELECT companyName, organizationID FROM sdtech.organizationusers;'
    let query = conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({'status':200, 'error':null, 'response':results}));
    });
}

//to get all of the information from the student and the user, we also need a method to create the student user as the user account is created.
//SELECT * FROM sdtech.users
//INNER JOIN sdtech.studentusers ON users.id = studentusers.userID;