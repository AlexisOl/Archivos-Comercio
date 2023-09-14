const express = require('express')
const controllerUser = require('../controller/userController')
const controllerProducto = require('../controller/bodegaController');
const inventarioController = require('../controller/inventarioController');

const router = express.Router();
// obtener usuario en sesion
router.get('/user-sesion',controllerUser.getUsuario)

//rutas bodega
router.post('/guardarProducto', controllerProducto.setProducto)
router.get('/buscarProducto', controllerProducto.buscarProductoId)
router.post('/guardarAsignacionProducto', controllerProducto.ingresoAsignacionProducto)
router.get('/verProducto', controllerProducto.busquedaGeneral)

//rutas inventario
router.get('/verBodega', inventarioController.mostrarBodega)



module.exports = router;