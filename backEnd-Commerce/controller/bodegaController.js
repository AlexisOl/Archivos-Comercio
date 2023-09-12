const { pool } = require('../model/conexiondb'); 


const setProducto = async (req, res) => {
    const id = 4;
    const nombre = req.body.nombre;
    const precio = parseFloat(req.body.precio);
    console.log(nombre);
    console.log(precio);

    // Verificar que los valores no sean nulos o indefinidos
 

    try {
        const respuesta = await pool.query("INSERT INTO manejoproductos.productos VALUES ($1, $2, $3);", [id, nombre, precio]);
        res.status(200).json(respuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error ingreso producto.' });
    }
};


module.exports = {
    setProducto: setProducto
};