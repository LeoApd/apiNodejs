const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

createToken = (userId) => {
    return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
}
module.exports = {
    async create (req, res) {
        try{
            const { cpf } = req.body;
            if(await User.findOne({ cpf })) return res.status(400).send({ error: "Cpf já cadastrado" });
            const user = await User.create(req.body);
            user.password = undefined;
            return res.send({ user, message: "Usuário cadastrado com sucesso" });
        }catch(err){
            return res.status(500).send({ error: 'Erro ao cadastrar user' });
        }
    },

    async auth (req, res){
        try{
            const { login, password } = req.body;
            if(!login || !password) return res.send({ error: "Preencha login e senha" });
            const user = await User.findOne({ login }).select('+password');
            if(!user) return res.send({ error: "Credenciais não cadastradas" });
            if(await password != user.password) return res.send({ error: 'Usuário ou senha invalido' });
            user.password = undefined;
            return res.send({ user, token: createToken(user._id) });
        }catch(err){
            return res.status(500).send({ error: `Erro ao tentar autenticar usuário ${err}` });
        }
    }
}