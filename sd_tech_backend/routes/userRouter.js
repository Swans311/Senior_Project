const express = require('express')

const UserCtrl = require('../controllers/userController')

const router = express.Router()

router.post('/user', UserCtrl.createUser)
// router.put('/user/:id', UserCtrl.updateUser)
router.delete('/user', UserCtrl.deleteUser)
router.get('/userEmail', UserCtrl.getUserByEmail)
router.get('/users',UserCtrl.getUsers)
router.post('/userValidate',UserCtrl.validateUser)

module.exports = router