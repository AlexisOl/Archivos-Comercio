const { pool } = require('../model/conexiondb'); 


const buscarCliente = async(req, res) => {
    const nit = req.query.nit;
    console.log(nit);


    try {
        const result = await pool.query("SELECT * FROM manejoGeneral.Clientes WHERE nit = $1;",
        [nit]);
        // mandar peticion 
        if (result.rows.length <1) {
            res.status(404).json({error: 'no se encontro'});
        } else {
            res.status(200).json(result.rows[0]);
        }

    } catch(error) {
        console.log(error);
    }

};


module.exports= {
  
    buscarCliente: buscarCliente
};