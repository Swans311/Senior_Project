const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrganizationAccount = new Schema({
    companyName: {type:String, required:true},
    taxID: {type:String, required:true},
    accountManager:{type:String, required:true},
})

module.exports = mongoose.model('organization',OrganizationAccount)