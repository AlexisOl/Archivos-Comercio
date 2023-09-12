const { Model } = require("sequelize")


const productos = {
    nombre: String,
    precio: Number,
}

module.exports=Model('producto', productos);