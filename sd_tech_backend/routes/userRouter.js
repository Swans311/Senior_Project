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


module.exports = router