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

//funcion para el ingreso de clientes:

const ingresoCliente = async(req, res) => {
    const {id, nit, nombre, descuento, cantidadGastado} = req.body ;

    try {
     
        await pool.query(
            'INSERT INTO manejoGeneral.Clientes (nombre, nit, descuentos, cantidadGastado) VALUES ($1, $2, $3, $4)',
            [ nombre, nit,null, cantidadGastado]
        );
    
        res.status(200).json({ message: 'Asignación de cliente exitosa' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asignar el cliente.' });
      }

};


const obtenerTarjeta = async(req, res) => {
    const { identificador } = req.query;
    console.log("tarjeta id"+identificador);
    try {
        const valorTarjeta = await pool.query(
            'SELECT * FROM manejoGeneral.tarjetas WHERE identificador = $1;',
            [ identificador]
        );
        res.status(200).json(valorTarjeta.rows[0])
    } catch(error) {
        res.status(500).json({
            error: 'no se proceso la tarjeta'
        })
    }
};

//funcion para eliminacion de elementos

const eliminarElementosCompra = async (req, res) => {
    const { identificador, cantidad } = req.body;

    if(identificador !== null){
        try {
          // Obtención del valor general
          const cantidadInicial = await pool.query(
            "SELECT * FROM manejoinventario.registroinventariobodega WHERE identificador = $1",
            [identificador]
          );
            console.log(cantidadInicial.rows[0]);
          if (cantidadInicial.rows.length > 0) {
            // Verificar si se encontraron resultados
            const cantidadActualizada =
              parseInt(cantidadInicial.rows[0].cantidadgeneral) - parseInt(cantidad);
      
            await pool.query(
              "UPDATE manejoinventario.registroinventariobodega SET cantidadgeneral = $1 WHERE identificador = $2;",
              [cantidadActualizada, identificador]
            );
      
            res.status(200).json({
              ingreso: 'eliminacion Exitosa',
            });
          } else {
            // No se encontraron resultados para el identificador proporcionado
            res.status(404).json({
              error: 'No se encontró ningún registro para el identificador proporcionado.',
            });
          }
        } catch (error) {
          console.error('Error al eliminar elementos:', error);
          res.status(500).json({
            error: 'Hubo un error en el servidor al eliminar elementos.',
          });
        }
    }
   
  };
  


  //funcion para ingreso de factura:

  const ingresoFactura = async (req, res) => {
    const {identificador, nit_cliente, nombre_cliente, total_global, total_Descontado, fecha_facturacion} = req.body;
    try {
        const valorIdentificador = await pool.query(
            'INSERT INTO manejoventas.facturas (nit_cliente, nombre_cliente, total_global, total_Descontado, fecha_facturacion) VALUES ($1, $2, $3, $4, $5) RETURNING identificador;',
            [ nit_cliente, nombre_cliente,total_global, total_Descontado, fecha_facturacion]
        );
    
        res.status(200).json({ 
            message: 'Asignación de factura exitosa',
            identificador: valorIdentificador.rows[0].identificador });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asignar factura.' });
      }
  }

// funcion para ingreso de detalle Factura 
const detalleFacturaIngreso = async (req, res) => {
    const {identificador, identificadorFactura, identificador_producto_Inventario, nombre_producto, cantidad, precio_especifico} = req.body;
    try {
        await pool.query(
            'INSERT INTO manejoventas.detallefacturas (identificadorFactura, identificador_producto_Inventario, nombre_producto, cantidad, precio_especifico) VALUES ($1, $2, $3, $4, $5)',
            [ identificadorFactura, identificador_producto_Inventario,nombre_producto, parseFloat(cantidad), parseFloat(precio_especifico)]
        );
    
        res.status(200).json({ message: 'Asignación de detalle' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asignar detalle.' });
      }
  }

// funcion final para ingreso de venta
const ingresoVentaFinal = async (req, res) => {
    const {identificador, identificador_empleado, identificador_factura} = req.body;
    try {
        await pool.query(
            'INSERT INTO manejoventas.Ventas (identificador_empleado, identificador_factura) VALUES ($1, $2)',
            [ identificador_empleado, identificador_factura]
        );
    
        res.status(200).json({ message: 'Asignación de venta exitosa' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asignar venta.' });
      }
  }

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
    devolverProductoInventario: devolverProductoInventario,
    ingresoCliente:ingresoCliente,
    obtenerTarjeta: obtenerTarjeta,
    eliminarElementosCompra:eliminarElementosCompra,
    ingresoFactura:ingresoFactura,
    detalleFacturaIngreso:detalleFacturaIngreso,
    ingresoVentaFinal:ingresoVentaFinal
};