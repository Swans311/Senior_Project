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
router.get('/myApps/:id', UserCtrl.getScholarshipsAppliedTo)
router.get('/studentAppInfo/:id', UserCtrl.getStudentInfoByScholarship)

//for applications and scholarships
router.get('/allApps', UserCtrl.getAllApplications)
router.get('/allActiveScholarships', UserCtrl.getAllActiveScholarships)
router.get('/appsByScholarship', UserCtrl.getApplicationsByScholarshipID)
router.get('/appsByStudent/:id', UserCtrl.getApplicationsByUserID)
router.get('/allScholarships', UserCtrl.getAllScholarships)
router.get('/scholarshipsByID/:id', UserCtrl.getScholarshipsByID)
router.post('/createScholarship', UserCtrl.createScholarship)
router.post('/createApplication', UserCtrl.createApplication)
router.get('/getScholarship/:id', UserCtrl.getScholarshipBySID)


//all update api requests here
router.put('/selectWinner', UserCtrl.selectWinner)
router.put('/rejectAll', UserCtrl.rejectAllApps)
router.put('/closeScholarship', UserCtrl.closeScholarship)
router.put('/updateOrg',UserCtrl.updateOrganization)
router.put('/updateStudent', UserCtrl.updateStudent)

//deletes go here...
router.delete('/deleteApp/:id', UserCtrl.deleteApplication)

module.exports = router