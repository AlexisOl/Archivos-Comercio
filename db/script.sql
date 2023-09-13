-- DATABASE DE VENNTAS
CREATE DATABASE chapin_market;
--cambios para use
\c chapin_market;

--creacion de schemas
-- schema para sucursales
CREATE SCHEMA manejoGeneral;
-- schema para empleados
CREATE SCHEMA manejoEmpleados;
CREATE SCHEMA manejoVentas;
-- schema como para bodega
CREATE SCHEMA manejoProductos;


---tabla de sucursal bvarchar porque yo ingreso los scripts
CREATE TABLE manejoGeneral.sucursal( 
    identificador VARCHAR(25) NOT NULL,
    nombre VARCHAR(75) NOT NULL,
    cantidad_productos INT NOT NULL,
    PRIMARY KEY(identificador)
);

--tabla de roles de empleados varchar porque yo ingreso los scripts

CREATE TABLE manejoEmpleados.Roles (
    identificador VARCHAR(10) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    PRIMARY KEY(identificador)
);

--tabla de empleadoss  SERIAL PORQUE AGREGO EVENTUALEMNTE 
CREATE TABLE manejoEmpleados.Empleados (
    identificador VARCHAR(25) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    contrasenia VARCHAR(50) NOT NULL,
    id_rol VARCHAR(10) NOT NULL,
    id_sucursal VARCHAR(25) NOT NULL,
    PRIMARY KEY(identificador),
    FOREIGN KEY (id_sucursal) REFERENCES manejoGeneral.sucursal(identificador),
    FOREIGN KEY (id_rol) REFERENCES manejoEmpleados.Roles(identificador)

);

-- tabla de los productos SERIAL PORQUE AGREGO EVENTUALEMNTE 
CREATE TABLE manejoProductos.Productos (
    identificador SERIAL NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    precio DECIMAL(8,2),
    PRIMARY KEY(identificador)
);


-- tabla de asignacion en bodega  SERIAL PORQUE AGREGO EVENTUALEMNTE -------------------------------
CREATE TABLE manejoProductos.asingacionBodega (
    identificador SERIAL NOT NULL,
    cantidad int NOT NULL,
    fecha_asignacion DATE NOT NULL,
    id_sucursal VARCHAR(25) NOT NULL,
    id_producto int NOT NULL,
    PRIMARY KEY (identificador),
    FOREIGN KEY (id_sucursal) REFERENCES manejoGeneral.sucursal(identificador),
    FOREIGN KEY (id_producto) REFERENCES manejoProductos.productos(identificador)
);
----------------------------------------------------------------------------
----------------------------------------------------------------------------
----------------------------------------------------------------------------
----------------------------------------------------------------------------
----------------------------------------------------------------------------
--tabla de clientes:
CREATE TABLE manejoGeneral.Clientes (
    identificador VARCHAR(25) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    dpi INT NOT NULL,
    nit VARCHAR(15) NOT NULL,
    descuentos INT NOT NULL,
    PRIMARY KEY(identificador)
);


--
--schema de registroVentas
CREATE TABLE registroVentas.Ventas (
    identificador VARCHAR(25) NOT NULL,
    identificador_empleado VARCHAR(25) NOT NULL,
    nit VARCHAR(25) NOT NULL,
    fecha DATE NOT NULL,
    PRIMARY KEY(identificador),
    FOREIGN KEY (identificador_empleado) REFERENCES registroformacion.Empleados(identificador)
);

-- tabla para las facturas
CREATE TABLE .facturas (
    identificador VARCHAR(25) NOT NULL,
    nit_cliente VARCHAR(15) NOT NULL,
    nombre_cliente VARCHAR(15),
    total_parcial DECIMAL(10,2) NOT NULL,
    total_global DECIMAL(10,2) NOT NULL,
    listado
);


--tabla para las sucursales
CREATE TABLE registroVentas.asignacion_bodega (
 identificador VARCHAR(25) NOT NULL,
 identificador_sucursal VARCHAR(25) NOT NULL,
 identificador_producto VARCHAR(25) NOT NULL,
 fecha_ingreso DATE NOT NULL,
 estado_uso VARCHAR(70) NOT NULL,
 cantidad_almacenado INT NOT NULL,
 PRIMARY KEY(identificador)
 FOREIGN KEY(identificador_sucursal) REFERENCES re
 FOREIGN KEY(identificador_producto) REFERENCES re
);







-- scripts de roles ------------------------------------------------------

--- rol para 



-- scripts de inserciones ------------------------------------------------------

INSERT INTO manejoempleados.empleados VALUES 
  ('1','Juan', 'contrasenia1', 1, 1),
  ('2','Maria', 'contrasenia2', 2, 2),
  ('3','Carlos', 'contrasenia3', 3, 1);


INSERT INTO manejogeneral.sucursal VALUES 
  ('1','norte', '120'),
  ('2','sur', '172'),
  ('3','centro', '300');



