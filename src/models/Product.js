const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema ({
    code: { type: String, unique: true },//codigo
    name: String,//nome
    value: Number,//valor
    amount: Number,//quantidade
    description: String,//descrição
    //image: String,//imagem
    cretated: { type: Date, default: Date.now } //data que foi salvo no banco
});

module.exports = mongoose.model('Product', ProductSchema);//criando e exportando um novo documento do tipo product
