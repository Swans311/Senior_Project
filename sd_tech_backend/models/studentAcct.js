const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentAccount = new Schema({
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    major:{type:String, required:false},
    gpa:{type:String, required:false},
    ethnicity:{type:String, required:false},
    gender:{type:String, required:false},
    email:{type:String, required:true},
})

module.exports = mongoose.model('studentAcct',StudentAccount)