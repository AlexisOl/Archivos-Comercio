const express = require('express');
const bodyParser = require('body-parser');
const cons = require('cors');
const mysql = require('mysql');
const {getAlgo} = require('./model/conexiondb.js');
const {getUsuarios} = require('./controller/loginUserController.js')

const usersRoutes = require('./router/login.routes.js')


const {ingreso} = require('pg');


// ingreso server
const servidor = express();

//atributos servidot
var opciones = {
    origen : "http://localhost:8080"
};

servidor.use(cons(opciones));

servidor.use(express.json());

servidor.use(express.urlencoded({extended: true}))
//generra la ruta:
servidor.get("/", (req, res) => {
    res.json({mensje : "ingreso al front"})
});
//rutas 
servidor.get('/roles', getAlgo);
servidor.get('/login', getUsuarios)


//rutas de usuario
servidor.use('/api/user', usersRoutes)


//ingreso del puerto
const puerto = process.env.PORT || 8080;


servidor.listen(puerto, ()=> {
    console.log(`servidor en ${puerto}`);
});




