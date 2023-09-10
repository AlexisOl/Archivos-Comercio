const { Model } = require("sequelize")


const usuarios = {
    nombre: String,
    password: String,
    id_rol: String,
    id_sucursal: String
}

module.exports=Model('user', usuarios);