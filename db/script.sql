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

--------------
--------------
--------------
--------------
-------------- CAMBIO CLIENTE
CREATE TABLE manejoGeneral.Clientes (
    identificador SERIAL NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    nit VARCHAR(15) NOT NULL,
    descuentos INT,
    cantidadGastado DECIMAL(10,2),
    puntosGanados DECIMAL(10,2) not null,
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
    identificadorFactura INT NOT NULL,
    identificador_producto_Inventario INT NOT NULL,
    nombre_producto VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    precio_especifico DECIMAL(10,2)  NOT NULL,
    PRIMARY KEY(identificador),

    FOREIGN KEY (identificadorFactura) REFERENCES manejoVentas.facturas(identificador),
    FOREIGN KEY (identificador_producto_Inventario) REFERENCES manejoInventario.registroInventarioBodega(identificador)
);

----------------------------------------------------------------------------
--
--schema de registroVentas
CREATE TABLE manejoVentas.Ventas (
    identificador SERIAL NOT NULL,
    identificador_empleado VARCHAR(25) NOT NULL,
    identificador_factura INT NOT NULL,
    PRIMARY KEY(identificador),
    FOREIGN KEY (identificador_empleado) REFERENCES manejoEmpleados.Empleados(identificador),
    FOREIGN KEY (identificador_factura) REFERENCES manejoVentas.facturas(identificador)
);




-- scripts de roles ------------------------------------------------------


--usuario 1 :  -------------------------------------
-- Crea el rol inventariorol
CREATE ROLE inventariorol;

GRANT CONNECT ON DATABASE chapin_market TO inventariorol;

GRANT USAGE ON SCHEMA manejoProductos, manejoInventario TO inventariorol;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE manejoProductos.asingacionBodega TO inventariorol;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE manejoProductos.productos TO inventariorol;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE manejoInventario.registroInventarioBodega TO inventariorol;
GRANT USAGE, SELECT ON SEQUENCE manejoInventario.registroInventarioBodega_identificador_seq TO inventariorol;

CREATE USER userinventario WITH PASSWORD 'inv1234';

GRANT inventariorol TO userinventario;








--- rol para bodega
CREATE ROLE bodeganormal;

GRANT CONNECT ON DATABASE chapin_market TO bodeganormal;
GRANT USAGE ON SCHEMA manejoProductos TO bodeganormal;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE manejoProductos.Productos, manejoProductos.asingacionBodega TO bodeganormal;
GRANT SELECT, USAGE ON ALL SEQUENCES IN SCHEMA manejoProductos TO bodeganormal;

CREATE USER bodegausuario WITH PASSWORD 'bodega123';

GRANT bodeganormal TO bodegausuario;




-- Crear el rol del cajero


-- Crear el cajero
CREATE ROLE cajerorol;

GRANT CONNECT ON DATABASE chapin_market TO cajerorol;
GRANT USAGE ON SCHEMA manejoProductos, manejoGeneral, manejoEmpleados, manejoVentas, manejoInventario TO cajerorol;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA manejoProductos, manejoGeneral, manejoEmpleados, manejoVentas, manejoInventario TO cajerorol;
--seucencias
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA manejoProductos, manejoGeneral, manejoEmpleados, manejoVentas, manejoInventario TO cajerorol;

CREATE USER cajerousuario WITH PASSWORD 'cash123';
-- Asignar el rol al usuario
GRANT cajerorol TO cajerousuario;


-- scripts de inserciones ------------------------------------------------------

INSERT INTO manejoempleados.empleados VALUES 
  ('1','Juan', 'contrasenia1', 1, 1),
  ('2','Maria', 'contrasenia2', 2, 2),
  ('3','Carlos', 'contrasenia3', 3, 1);


INSERT INTO manejogeneral.sucursal VALUES 
  ('1','norte', '120'),
  ('2','sur', '172'),
  ('3','centro', '300');

  INSERT INTO manejoEmpleados.Roles VALUES 
  ('1','cajero'),
  ('2','bodega'),
  ('3','administrador'),
  ('4','inventario')
  ;




INSERT INTO manejoGeneral.tarjetas VALUES 
  ('diamanante','30', '200','30000' ,'1000000000'),
  ('oro','20', '200','20000' ,'29999');



INSERT INTO manejoGeneral.clientes VALUES 
  ('jose','1234', '0','30000' ),
  ('alexxus','2468', '100','20000');



INSERT INTO manejoempleados.empleados VALUES 
  ('7','Ricardo', 'contrasenia3', 4, 3),
  ('8','Josefa', 'contrasenia3', 4, 1),
  ;
