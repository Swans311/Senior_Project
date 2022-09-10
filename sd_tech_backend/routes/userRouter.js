const express = require('express')

const UserCtrl = require('../controllers/userController')

const router = express.Router()

router.post('/user', UserCtrl.createUser)
router.post('/userS', UserCtrl.createStudentUser)
router.post('/userO', UserCtrl.createOrganizationUser)
router.put('/user/id', UserCtrl.updateUser)
router.delete('/user', UserCtrl.deleteUser)
router.get('/userEmail', UserCtrl.getUserByEmail)
router.get('/users',UserCtrl.getUsers)
router.post('/userValidate',UserCtrl.validateUser)
router.get('/userInfoS/:id', UserCtrl.getUserInfoS)
router.get('/userInfoO/:id', UserCtrl.getUserInfoO)
router.get('/getCompanies', UserCtrl.getCompanies)

//for applications and scholarships
router.get('/allApps', UserCtrl.getAllApplications)
router.get('/appsByScholarship', UserCtrl.getApplicationsByScholarshipID)
router.get('/appsByStudent', UserCtrl.getApplicationsByUserID)
router.get('/allScholarships', UserCtrl.getAllScholarships)
router.get('/scholarshipsByID', UserCtrl.getScholarshipsByID)
router.post('/createScholarship', UserCtrl.createScholarship)
router.post('/createApplication', UserCtrl.createApplication)


module.exports = router