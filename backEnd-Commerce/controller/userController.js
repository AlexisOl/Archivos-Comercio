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
const getId = async (req, res) => {
    try {
      const nombre = req.query.nombre;
      const sucursal = req.query.id_sucursal;
      const respuesta = await pool.query('SELECT * FROM manejoEmpleados.empleados WHERE nombre = $1 AND id_sucursal = $2;', [nombre, sucursal]);
      const usuario = respuesta.rows[0]; // Obtener el primer usuario del array
  
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  

module.exports = {
    getUsuario: getUsuario,
    getId: getId

};