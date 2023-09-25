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


// funcion para devolver productos
const devolverProductoInventario = async(req, res) => {
    const { id_sucursal} = req.query;
    try {
        const result = await pool.query("SELECT * FROM manejoempleados.empleados WHERE id_sucursal=$1; ",
        [id_sucursal]);

        const valor = result.rows;
        const nombres =valor.map(rows => rows.identificador);
        const nuevoArrayNombre = nombres.join(',');

        console.log(nuevoArrayNombre);
        console.log(typeof(nuevoArrayNombre));
        var canitdadprueba = [1,7,6].join(',');
        console.log(canitdadprueba);
        console.log(typeof canitdadprueba);
        
        // Convierte la cadena en un arreglo usando split(',')
        var cantidadArray = canitdadprueba.split(',');
        
        var valorCasteo = '';
        var valorPosicion = 0;
        
        cantidadArray.forEach(element => {
            valorPosicion++;
            if (valorPosicion === cantidadArray.length) {
                valorCasteo += `(CAST(${element} AS varchar))`;
            } else {
                valorCasteo += `(CAST(${element} AS varchar)), `;
            }
        });
        
        console.log(valorCasteo);
        
        //*** este si lo quiero devolver  **/
        const inventarioResult = await pool.query(
            `SELECT * FROM manejoinventario.registroinventariobodega WHERE id_empleado IN (${valorCasteo});`
        );
        console.log(inventarioResult.rows);
        var nuevosIdentificadoresBodega = inventarioResult.rows.map(rows => rows.codigo_producto_bodega);
        const nuevoArrayIdentificadorBodega = nuevosIdentificadoresBodega.join(',');

        console.log(nuevoArrayIdentificadorBodega);
        var arraySimpleIdentificadorBodega = nuevoArrayIdentificadorBodega.split(',');

        //variables casteo
        var cadenaBodega='';
        var posicionBodega=0;
        var textoFinal = await casteos(arraySimpleIdentificadorBodega,posicionBodega,cadenaBodega );



        const bodegaPeticionInventarioResult = await pool.query(
            `SELECT * FROM manejoproductos.asingacionbodega WHERE identificador IN (${nuevoArrayIdentificadorBodega});`
            
        );
        // ahora que me devuelva el objeto identificador(Bodega)
        console.log(bodegaPeticionInventarioResult.rows);


        // ahora que me tire el producto
        /*
            ***
            *****
            ******* este si quiero devolverlo 


            
        */ 

        const todoslosProductosSucursal = bodegaPeticionInventarioResult.rows.map(rows =>
                                                                                    rows.id_producto);
        const arrayProductoTexto = todoslosProductosSucursal.join(',');
        const arrayFinalProducto = arrayProductoTexto.split(',');
        const productoPeticionInventarioResult = await pool.query(
            `SELECT * FROM manejoproductos.productos WHERE identificador IN (${arrayFinalProducto});`
            
        );
        // ahora que me devuelva el objeto identificador(Bodega)
        console.log(productoPeticionInventarioResult.rows);


        //---------------------------------------------
        //---------------------------------------------
        //---------------------------------------------
        //---------------------------------------------
        //---------------------------------------------
        // devolucion de json con dos jsons 
        res.status(200).json({
            inventario: inventarioResult.rows,
            bodega: bodegaPeticionInventarioResult.rows,
            productos:productoPeticionInventarioResult.rows})

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error de peticion.' });
    }
};



//funcion para casteos

async function casteos(arrayValor, posicion, textoCadena){
    arrayValor.forEach(element => {
        posicion++;
        if (posicion === arrayValor.length) {
            textoCadena += `(CAST(${element} AS varchar))`;
        } else {
            textoCadena += `(CAST(${element} AS varchar)), `;
        }
    });
    return textoCadena;
}

module.exports= {
  
    buscarCliente: buscarCliente,
    devolverProductoInventario: devolverProductoInventario
};