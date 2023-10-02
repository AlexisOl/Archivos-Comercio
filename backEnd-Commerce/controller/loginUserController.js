const {pool} = require('../model/conexiondb.js');

const getUsuarios = async(req, res) => {

    const {nombre, password} = req.query;
    console.log(nombre, password);
    const respuesta = await pool.query('SELECT * FROM manejoEmpleados.empleados WHERE nombre = $1 AND contrasenia = $2;',
    [nombre, password]);
    res.status(200).json(respuesta.rows[0]);

};


module.exports={
    getUsuarios

};