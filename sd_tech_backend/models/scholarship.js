const mongoose = require('mongoose')
const organizationAcct = require('./organizationAcct')
const Schema = mongoose.Schema

const Scholarship = new Schema({
    postedBy: {type:organizationAcct, required:true},
    value: {type:String, required:true},
    essayRequired:{type:Boolean, required:true},
    major:{type:String, required:false},
    ethnicity:{type:String, required:false},
    description:{type:String, required:true},
})

module.exports = mongoose.model('scholarship',Scholarship)