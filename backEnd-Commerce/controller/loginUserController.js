const {pool} = require('../model/conexiondb.js');

const getUsuarios = async(req, res) => {
    const respuesta = await pool.query('SELECT * FROM manejoEmpleados.empleados;');
    res.status(200).json(respuesta.rows);

};

module.exports={
    getUsuarios
};