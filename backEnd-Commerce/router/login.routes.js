const express = require('express')
const controllerUser = require('../controller/userController')


const router = express.Router();

router.get('/user-sesion',controllerUser.getUsuario)

module.exports = router;