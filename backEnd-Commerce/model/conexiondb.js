const conexion = require("./db.js");
const {Pool} = require('pg');

// generacion de la conexion de postgres - GLOBAL
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "password",
    database: "chapin_market",
    port: "5432"
});
// generacion de la conexion de postgres - GLOBAL
const pool2 = new Pool({
    host: "localhost",
    user: "bodegausuario",
    password: "bodega123",
    database: "chapin_market",
    port: "5432"
  });
  

  const pool3 = new Pool({
    host: "localhost",
    user: "userinventario",
    password: "inv1234",
    database: "chapin_market",
    port: "5432"
  });
  


  const pool5 = new Pool({
    host: "localhost",
    user: "cajerousuario",
    password: "cash123",
    database: "chapin_market",
    port: "5432"
  });
  


const getAlgo = async(req, res) => {
    const respuesta = await pool.query('SELECT * FROM manejoEmpleados.Roles;');
    res.status(200).json(respuesta.rows);
};


module.exports = {
    getAlgo,
    pool,
    pool2,
    pool3,
    pool5

};