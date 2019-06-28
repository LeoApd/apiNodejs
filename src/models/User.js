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
        type: String,
        unique: true
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
   
    login: { 
        type: String, 
        require: true, 
        unique: true
    },
    password: { 
        type: String,
        require: true, 
        unique: true, 
        select: true
    },
    profile: { 
        type: String 
    },

    passwordResetToken: {
        type: String,
        select: true
    },

    passwordResetExpires:{
        type: Date,
        select: true
    },

    cretated: { 
        type: Date, 
        default: Date.now
    }
    
});

module.exports = mongoose.model('User', UserSchema);

