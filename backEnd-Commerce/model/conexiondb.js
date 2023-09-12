const conexion = require("./db.js");
const {Pool} = require('pg');

// generacion de la conexion de postgres
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "password",
    database: "chapin_m",
    port: "5432"
});



const getAlgo = async(req, res) => {
    const respuesta = await pool.query('SELECT * FROM manejoEmpleados.Roles;');
    res.status(200).json(respuesta.rows);
};


module.exports = {
    getAlgo,
    pool

};