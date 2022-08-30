const express = require('express')

const UserCtrl = require('../controllers/userController')

const router = express.Router()

router.post('/user', UserCtrl.createUser)
// router.put('/user/:id', UserCtrl.updateUser)
// router.delete('/user/:id', UserCtrl.deleteUser)
// router.get('/user/:id', UserCtrl.getUserById)
// router.get('/users',UserCtrl.getUsers)
// router.post('/userValidate/:payload',UserCtrl.validateUser)

module.exports = router