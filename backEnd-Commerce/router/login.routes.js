const express = require('express')
const controllerUser = require('../controller/userController')
const controllerProducto = require('../controller/bodegaController')

const router = express.Router();
// obtener usuario en sesion
router.get('/user-sesion',controllerUser.getUsuario)

//rutas bodega
router.post('/guardarProducto', controllerProducto.setProducto)


module.exports = router;