const { pool } = require('../model/conexiondb'); // Asegúrate de que la importación sea correcta

const getUsuario = async (req, res) => {
    const nombre = req.query.nombre;

    try {
        const respuesta = await pool.query('SELECT * FROM manejoEmpleados.empleados WHERE nombre = $1', [nombre]);
        const usuario = respuesta.rows[0]; // Obtener el primer usuario del array
        res.status(200).json(usuario);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar el usuario.' });
    }
};

module.exports = {
    getUsuario: getUsuario
};