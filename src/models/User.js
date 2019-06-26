const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String
    },
    cpf:{
        type: String,
        required: true,
        unique: true
    },
    rg:{
        type: String
    },
    email:{
        type: String
    },
    address:{
        cep: { type: String },
        street: { type: String },
        complement: { type: String },
        district: { type: String },
        locality:{ type: String },
        uf: { type: String },
        number: { type: Number },
    },
    credentials:{
        login: { type: String },
        password: { type: String },
        profile: { type: String }
    }
});

module.exports = mongoose.model('User', UserSchema);

