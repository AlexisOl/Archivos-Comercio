const { pool } = require('../model/conexiondb'); 



const mostrarBodega = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM manejoproductos.asingacionbodega ORDER BY identificador ASC;');
    
      res.status(200).json(result.rows)
  
    } catch(error) {
      console.log(error);
      res.status(500).json({error: 'error de busqueda'})
    }
  };



  module.exports = {
    mostrarBodega: mostrarBodega
  }