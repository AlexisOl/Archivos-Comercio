const { pool } = require("../model/conexiondb");

const mostrarBodega = async (req, res) => {
  const id_sucursal = req.query.id_sucursal;
  try {
    const result = await pool.query(
      "SELECT * FROM manejoproductos.asingacionbodega WHERE id_sucursal = $1 ORDER BY identificador ASC;",
      [id_sucursal]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error de busqueda" });
  }
};
//-------------------------------------------------------------------------------------------------
const mostrarInventario = async(req, res) => {
  //const id = req.query.identificadorl

  try{
    const result = await pool.query(
      "SELECT * FROM manejoinventario.registroinventariobodega ORDER BY identificador ASC;"
    )
    res.status(200).json(result.rows);
  } catch(error){
    res.status(500).json({error:'error de busqueda'})
  }
}



//-------------------------------------------------------------------------------------------------

const buscarProductoBodega = async (req, res) => {
  const id = req.query.identificador; // Cambia req.body.id a req.query.identificador
  try {
    // Consulta SQL para buscar el producto por identificador
    const result = await pool.query(
      "SELECT * FROM manejoproductos.asingacionbodega WHERE identificador = $1;",
      [id]
    );

    if (result.rows.length === 1) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar el producto." });
  }
};

//busca de cantidad de elementos en bodega (INVENTARIO)
const buscaCantidadProdInventario = async (req, res) => {
  const id = req.query.identificador;
  console.log(id);
  try {
    const result = await pool.query(
      "SELECT * FROM manejoinventario.registroinventariobodega WHERE codigo_producto_bodega = $1;",
      [id]
    );
    if (result.rows.length === 1) {
      res.status(200).json(result.rows[0]);
      console.log("cantidad inventario" + result.rows[0].cantidadgeneral);
    } else {
      res.status(400).json({ error: "no existe el producto" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar el producto." });
  }
};

// ingreso de elementos:
const ingresoElementos = async (req, res) => {
  const { producto, idSucursal } = req.body;
  // recibir elementos
  const { cantidadInventario, pasillo, id_empleado, id_prod_bodega, estado } =
    producto;
  console.log(cantidadInventario, pasillo, id_empleado, id_prod_bodega, estado);
  // Verifica si idProductoBodega es un número entero válido
  console.log(idSucursal);
  if (!Number.isInteger(id_prod_bodega)) {
    return res.status(400).json({
      error:
        "El código de producto en bodega debe ser un número entero válido.",
    });
  }

  try {
    // Verificar si ya existe una asignación para el mismo producto en la misma sucursal
    const enSucursal = await pool.query(
      "SELECT * FROM manejoproductos.asingacionbodega WHERE id_sucursal = $1 AND identificador = $2 ",
      [idSucursal, id_prod_bodega]
    );
    console.log(" ----  ", enSucursal.fields);
    const existingAssignment = await pool.query(
      "SELECT * FROM manejoinventario.registroinventariobodega WHERE codigo_producto_bodega = $1 ",
      [id_prod_bodega]
    );
    if (enSucursal.rows.length > 0) {
      if (existingAssignment.rows.length > 0) {
        // Si ya existe
        const updatedQuantity =
          existingAssignment.rows[0].cantidadgeneral + cantidadInventario;

        // para lo de bodega
        eliminarBodega(
          cantidadInventario,
          id_prod_bodega,
          updatedQuantity,
          id_empleado
        );
      } else {
        await pool.query(
          "INSERT INTO manejoinventario.registroinventariobodega (codigo_producto_bodega, estado_uso, cantidadgeneral, pasillo, id_empleado ) VALUES ($1, $2, $3, $4, $5)",
          [id_prod_bodega, estado, cantidadInventario, pasillo, id_empleado]
        );
      }

      res.status(200).json({ message: "Ingreso de inventario exitoso" });
    } else {
      console.log("no existe en bodega de sucursal");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al ingresar el producto." });
  }
};

// FUNCION PARA ELIMIANAR BODEGA ----------------------------------------------------------------
async function eliminarBodegaInicial(
  cantidad,
  identificador,
  cantidadInventario,
  estado,
  idEmpleado,
  pasillo
) {
  const cantidadBodega = await pool.query(
    "SELECT * FROM manejoproductos.asingacionbodega WHERE identificador = $1",
    [identificador]
  );

  const cantidaddeBodega = parseInt(cantidadBodega.rows[0].cantidad); // Accede a la propiedad correcta

  if (cantidad <= cantidaddeBodega) {
    const actualizaBodega = cantidaddeBodega - cantidad;
    await pool.query(
      "UPDATE manejoproductos.asingacionbodega SET cantidad = $1 WHERE identificador = $2",
      [actualizaBodega, identificador]
    );

    await pool.query(
      "UPDATE manejoinventario.registroinventariobodega SET cantidadgeneral = $1, id_empleado = $2 WHERE codigo_producto_bodega = $3;",
      [cantidadInventario, idEmpleado, identificador]
    );
  } else {
    console.log(
      "No se puede hacer el ingreso, sobrepasa la cantidad de elementos en bodega"
    );
  }
}
async function eliminarBodega(
  cantidad,
  identificador,
  cantidadInventario,
  idEmpleado
) {
  const cantidadBodega = await pool.query(
    "SELECT * FROM manejoproductos.asingacionbodega WHERE identificador = $1",
    [identificador]
  );

  const cantidaddeBodega = parseInt(cantidadBodega.rows[0].cantidad); // Accede a la propiedad correcta

  if (cantidad <= cantidaddeBodega) {
    const actualizaBodega = cantidaddeBodega - cantidad;
    await pool.query(
      "UPDATE manejoproductos.asingacionbodega SET cantidad = $1 WHERE identificador = $2",
      [actualizaBodega, identificador]
    );

    await pool.query(
      "UPDATE manejoinventario.registroinventariobodega SET cantidadgeneral = $1, id_empleado = $2 WHERE codigo_producto_bodega = $3;",
      [cantidadInventario, idEmpleado, identificador]
    );
  } else {
    console.log(
      "No se puede hacer el ingreso, sobrepasa la cantidad de elementos en bodega"
    );
  }
}

const devolucionBodega = async (req, res) => {
  const { cantidad, id, idSucursal , maximo} = req.body;
  try {
    // Verificar si ya existe una asignación para el mismo producto en la misma sucursal
    const enSucursal = await pool.query(
      "SELECT * FROM manejoproductos.asingacionbodega WHERE id_sucursal = $1 AND identificador = $2 ",
      [idSucursal, id]
    );

    if (enSucursal.rows.length > 0) {
      const cantidadBodega = await pool.query(
        "SELECT * FROM manejoproductos.asingacionbodega WHERE identificador = $1",
        [id]
      );
    
      const cantidaddeBodega = parseInt(cantidadBodega.rows[0].cantidad);
      const actualizacionBodega = cantidaddeBodega+cantidad
      //para el inventario
       await pool.query(
        "UPDATE manejoinventario.registroinventariobodega SET cantidadgeneral = $1 WHERE codigo_producto_bodega = $2",
        [maximo-cantidad, id]
      );
      // para la bodega
      await pool.query(
        "UPDATE manejoproductos.asingacionbodega SET cantidad = $1 WHERE identificador = $2",
        [actualizacionBodega, id]
      );
    }

    res.status(200).json({ message: "Ingreso de inventario exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al ingresar el producto." });
  }
};

module.exports = {
  mostrarBodega: mostrarBodega,
  mostrarInventario: mostrarInventario,
  buscarProductoBodega: buscarProductoBodega,
  ingresoElementos: ingresoElementos,
  buscaCantidadProdInventario: buscaCantidadProdInventario,
  devolucionBodega:devolucionBodega
};
