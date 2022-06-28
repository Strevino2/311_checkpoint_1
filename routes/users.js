const express = require('express')
const usersController = require('../controllers/users')
const router = express.Router()

router.get('/', usersController.listUsers)

router.get('/:id', usersController.showUser)

router.post('/', usersController.createUser)

router.put('/:id', usersController.updateUser)

router.delete('/:id', usersController.deleteUser)

module.exports = router