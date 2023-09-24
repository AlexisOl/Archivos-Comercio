-- DATABASE DE VENNTAS
CREATE DATABASE chapin_market;
--cambios para use
\c chapin_market;

--creacion de schemas
-- schema para sucursales
CREATE SCHEMA manejoGeneral;
-- schema para empleados
CREATE SCHEMA manejoEmpleados;
-- schema para ventas
CREATE SCHEMA manejoVentas;
-- schema como para bodega
CREATE SCHEMA manejoProductos;
-- schema de inventario
CREATE SCHEMA manejoInventario;


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


-- tabla de asignacion en inventario  SERIAL PORQUE AGREGO EVENTUALEMNTE -------------------------------

CREATE TABLE manejoInventario.registroInventarioBodega(
    identificador SERIAL NOT NULL,
    codigo_producto_bodega int NOT NULL,
    estado_uso VARCHAR(25) NOT NULL,
    cantidadGeneral int NOT NULL,
    pasillo VARCHAR(10) NOT NULL,
    id_empleado VARCHAR(25) NOT NULL,
    PRIMARY KEY (identificador),
    FOREIGN KEY (codigo_producto_bodega) REFERENCES manejoProductos.asingacionBodega(identificador),
    FOREIGN KEY (id_empleado) REFERENCES manejoEmpleados.Empleados(identificador)
);
----------------------------------------------------------------------------
----------------------------------------------------------------------------
----------------------------------------------------------------------------
----------------------------------------------------------------------------
----------------------------------------------------------------------------

----- TABLA PARA LAS TARJETAS
---- cantidad base es de 200 Q
CREATE TABLE manejoGeneral.tarjetas (
    identificador SERIAL NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    cantidadPuntos int NOT NULL,
    cantidadBase int not null,
    rango_min int not NULL,
    rango_max int NOT NULL,
    PRIMARY KEY(identificador)
);
--tabla de clientes: descuentos null, ya que no es necesario que la pida 
CREATE TABLE manejoGeneral.Clientes (
    identificador SERIAL NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    nit VARCHAR(15) NOT NULL,
    descuentos INT,
    cantidadGastado INT,
    PRIMARY KEY(identificador),
    FOREIGN KEY (descuentos) REFERENCES manejoGeneral.tarjetas(identificador)
);
----------------------------------------------------------------------------
----------------------------------------------------------------------------



-- tabla para las facturas
CREATE TABLE manejoVentas.facturas (
    identificador SERIAL NOT NULL,
    nit_cliente VARCHAR(15) NOT NULL,
    nombre_cliente VARCHAR(15),
    total_global DECIMAL(10,2) ,
    total_Descontado DECIMAL(10,2) ,
    fecha_facturacion DATE NOT NULL,
    PRIMARY KEY(identificador)
);


-- TABLA PARA EL MANEJO DE DETALLE DE FACTURA, ES LA QUE LE SIGUE A FACTURA EN CREAR
CREATE TABLE manejoVentas.detallefacturas (
    identificador SERIAL NOT NULL,
    identificadorFactura VARCHAR(25) NOT NULL,
    identificador_producto_Inventario VARCHAR(25) NOT NULL,
    nombre_producto VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    precio_especifico INT NOT NULL,
    PRIMARY KEY(identificador)

);

----------------------------------------------------------------------------
--
--schema de registroVentas
CREATE TABLE manejoVentas.Ventas (
    identificador SERIAL NOT NULL,
    identificador_empleado VARCHAR(25) NOT NULL,
    identificador_factura INT NOT NULL,
    PRIMARY KEY(identificador),
    FOREIGN KEY (identificador_empleado) REFERENCES registroformacion.Empleados(identificador)
    FOREIGN KEY (identificador_factura) REFERENCES manejoVentas.facturas(identificador)
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




INSERT INTO manejoGeneral.tarjetas VALUES 
  ('diamanante','30', '200','30000' ,'1000000000'),
  ('oro','20', '200','20000' ,'29999');



INSERT INTO manejoGeneral.clientes VALUES 
  ('jose','1234', '0','30000' ),
  ('alexxus','2468', '100','20000');
