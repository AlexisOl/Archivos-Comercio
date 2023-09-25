const express = require('express')
const controllerUser = require('../controller/userController')
const controllerProducto = require('../controller/bodegaController');
const inventarioController = require('../controller/inventarioController');
const clienteController = require('../controller/clienteController');

const router = express.Router();
// obtener usuario en sesion
router.get('/user-sesion',controllerUser.getUsuario)
router.get('/userId-sesion',controllerUser.getId)


//rutas bodega
router.post('/guardarProducto', controllerProducto.setProducto)
router.get('/buscarProducto', controllerProducto.buscarProductoId)
router.post('/guardarAsignacionProducto', controllerProducto.ingresoAsignacionProducto)
router.get('/verProducto', controllerProducto.busquedaGeneral)

//rutas inventario
router.get('/verBodega', inventarioController.mostrarBodega)
router.get('/verInventario', inventarioController.mostrarInventario)

router.get('/buscarProductoBodega', inventarioController.buscarProductoBodega)
router.post('/ingresoInvetario', inventarioController.ingresoElementos)
router.get('/cantidadenInventario', inventarioController.buscaCantidadProdInventario)
router.post('/devolucionCantidad', inventarioController.devolucionBodega)



//rutas de caja 
router.get('/buscarClienteNit', clienteController.buscarCliente)
router.get('/obtenerProductoCajero', clienteController.devolverProductoInventario)


module.exports = router;