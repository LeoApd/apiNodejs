const jwt = require('jsonwebtoken');
const config = require('../config/config');

//criando middleware de autenticação
const auth = (req, res, next) => {
    //verificando se token foi enviado
    const token_header = req.headers.auth;
    if(!token_header) return res.send({ error: 'Token não foi enviado' });
    
    jwt.verify(token_header, config.JWT_SECRET, (err, decoded) =>{
        if(err) res.send({ error: 'Tokem inválido' });
        //req.userId = decoded.id;
        req.locals = decoded;
        return next();
    })
}

module.exports = auth;