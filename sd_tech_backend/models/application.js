const mongoose = require('mongoose')
const scholarship = require('./scholarship')
const studentAcct = require('./studentAcct')
const Schema = mongoose.Schema

const Application = new Schema({
    Scholarship: {type:scholarship, required:true},
    essay: {type:String, required:true},
    student:{type:studentAcct, required:true},
})

module.exports = mongoose.model('application',Application)