const { pool } = require('../model/conexiondb'); 


const setProducto = async (req, res) => {
    const nombre = req.body.nombre;
    const precio = parseFloat(req.body.precio);
    console.log(nombre);
    console.log(precio);

    // Verificar que los valores no sean nulos o indefinidos
 

    try {
        await pool.query("INSERT INTO manejoproductos.productos (nombre, precio) VALUES ($1, $2);", [nombre, precio]);
        res.status(200).json({ message: 'Producto ingresado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error ingreso producto.' });
    }
    
};


const buscarProducto = async (req, res) => {
  const id = req.query.identificador; // Cambia req.body.id a req.query.identificador
  try {
    // Consulta SQL para buscar el producto por identificador
    const result = await pool.query('SELECT * FROM manejoproductos.productos WHERE identificador = $1', [id]);

    if (result.rows.length === 1) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar el producto.' });
  }
};


const ingresoAsignacionProducto = async(req, res) => {
    const cantidad = req.body.cantidad;
    const fecha = req.body.fecha;
    const id_sucursal = req.body.id_sucursal;
    const id_producto = req.body.id_producto;
    console.log(cantidad, fecha, id_sucursal, id_producto);

    try {
        await pool.query("INSERT INTO manejoproductos.asingacionbodega (cantidad, fecha_asignacion,id_sucursal, id_producto) VALUES ($1, $2, $3, $4);", [cantidad, fecha, id_sucursal, id_producto]);
        res.status(200).json({ message: 'asignacion de producto ingresado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error ingreso producto.' });
    }
};


module.exports = {
    setProducto: setProducto,
    buscarProductoId : buscarProducto,
    ingresoAsignacionProducto: ingresoAsignacionProducto
};