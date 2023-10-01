const { pool } = require('../model/conexiondb'); 


const buscarFactura = async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM manejoventas.facturas;");
        // mandar peticion 
            res.status(200).json(result.rows);
    } catch(error) {
        console.log(error);
    }

};

module.exports = {
    buscarFactura: buscarFactura
}