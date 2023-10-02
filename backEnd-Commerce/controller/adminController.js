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
// para obtener todos los clientes
const buscarCliente = async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM manejogeneral.clientes ORDER BY cantidadgastado DESC;");
        // mandar peticion 
        res.status(200).json(result.rows);
    } catch(error) {
        console.log(error);
    }
}

//-----------------------------------------------------------------
const buscarFacturaMaxCantidad = async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM manejoventas.facturas ORDER BY total_descontado DESC;");
        // mandar peticion 
            res.status(200).json(result.rows);
    } catch(error) {
        console.log(error);
    }

};

// para obtener ventas en base a identificador 
const buscarVentaporId = async(req, res) => {
    const {identificador_factura} = req.query;

    try {
        const result = await pool.query("SELECT * FROM manejoventas.ventas WHERE identificador_factura = $1;",
        [identificador_factura]);
        // mandar peticion 
        res.status(200).json(result.rows[0]);
    } catch(error) {
        console.log(error);
    }
}


// usuario por suscursal 
const buscarEmpleadoSucursal = async(req, res) => {
    const {id_sucursal} = req.query;

    try {
        const result = await pool.query("SELECT * FROM manejoempleados.empleados WHERE id_sucursal = $1 AND id_rol = '1';",
        [id_sucursal]);
        // mandar peticion 
        res.status(200).json(result.rows);
    } catch(error) {
        console.log(error);
    }
}


// factura por usuario  
const buscarFacturaEmpeleado = async(req, res) => {
    const {identificador_empleado} = req.query;

    try {
        const result = await pool.query("SELECT * FROM manejoventas.ventas WHERE identificador_empleado = $1;",
        [identificador_empleado]);
        // mandar peticion 
        console.log(result.rows);
        console.log(identificador_empleado);
        res.status(200).json(result.rows);
    } catch(error) {
        console.log(error);
    }
}

// factura por usuario  
const buscarFacturaconIdentificadorVenta = async(req, res) => {
    const {identificador} = req.query;

    try {
        const result = await pool.query("SELECT total_descontado FROM manejoventas.facturas WHERE identificador = $1;",
        [identificador]);
        // mandar peticion 
        res.status(200).json(result.rows[0]);
    } catch(error) {
        console.log(error);
    }
}


// busca la cantidad de elementos  
const buscarCantidadGlobalElementos = async(req, res) => {

    try {
        const result = await pool.query("SELECT identificador_producto_inventario, SUM(cantidad) AS cantidad_total_vendida FROM manejoventas.detallefacturas GROUP BY identificador_producto_inventario ORDER BY cantidad_total_vendida DESC;");
        // mandar peticion 
        res.status(200).json(result.rows);
    } catch(error) {
        console.log(error);
    }
}

// busca id de bodega  
const buscarIdBodega = async(req, res) => {


    const {identificador} = req.query;
    try {
        const result = await pool.query("select codigo_producto_bodega from manejoinventario.registroinventariobodega WHERE identificador=$1 ;",
        [identificador]);
        // mandar peticion 
        res.status(200).json(result.rows[0]);
    } catch(error) {
        console.log(error);
    }
}

// busca id de proeducto  
const buscarIdProducto = async(req, res) => {
    const {identificador} = req.query;

    try {
        const result = await pool.query("select id_producto from manejoproductos.asingacionbodega WHERE identificador=$1;",
        [identificador]);
        // mandar peticion 
        res.status(200).json(result.rows[0]);
    } catch(error) {
        console.log(error);
 
    }
}


// busca  proeducto  
const buscarProductoFinal = async(req, res) => {
    const {identificador} = req.query;

    try {
        const result = await pool.query("select * from manejoproductos.productos WHERE identificador=$1;", 
        [identificador]);
        // mandar peticion 
        res.status(200).json(result.rows[0]);
    } catch(error) {
        console.log(error);
    }
}

//ingreso usuarios;
const ingresoUsuario = async(req, res) => {
    
    const {nombre, contrasenia,id_rol , id_sucursal} = req.body;
    console.log(nombre, contrasenia, id_rol, id_sucursal);
    try {
        const cantidadId= await pool.query("SELECT COUNT(*) + 1 AS cantidad_total FROM manejoempleados.empleados; ");
        let valorId= cantidadId.rows[0].cantidad_total;
        
        await pool.query("INSERT INTO manejoempleados.empleados (identificador, nombre, contrasenia, id_rol, id_sucursal) VALUES ($1, $2,$3, $4, $5);", 
        [valorId,nombre, contrasenia, id_rol, id_sucursal]);
        // mandar peticion 
        res.status(200).json({ message: 'empleado ingresado con éxito' });
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    buscarFactura: buscarFactura,
    buscarCliente: buscarCliente,
    buscarFacturaMaxCantidad: buscarFacturaMaxCantidad,
    buscarVentaporId:buscarVentaporId,
    buscarEmpleadoSucursal:buscarEmpleadoSucursal,
    buscarFacturaEmpeleado: buscarFacturaEmpeleado,
    buscarFacturaconIdentificadorVenta: buscarFacturaconIdentificadorVenta,
    buscarCantidadGlobalElementos:buscarCantidadGlobalElementos,
    buscarIdBodega:buscarIdBodega,
    buscarIdProducto:buscarIdProducto,
    buscarProductoFinal:buscarProductoFinal,
    ingresoUsuario: ingresoUsuario
}