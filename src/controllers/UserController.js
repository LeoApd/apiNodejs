const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

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
    },

    async forgotPassword (req, res){
        const { email } = req.body;
        try{
            const user = await User.findOne({ email });
            if(!user) return res.send({ error: 'email não encontrado' });

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findOneAndUpdate(user.id, {
                passwordResetTotken: token,
                passwordResetExpires: now
            });

            const optionEmail = {
                to: email, //para quem vai ser enviado
                from: 'leonardo_.apdsilva@hotmail.com', //de quem vai ser enviado o email
                template: 'forgot_password',
                context: { token },
            }

            mailer.sendMail(optionEmail, (err) =>{ 
                console.log(err)
                if(err)return res.status(400).send({ error: 'Erro ao enviar email' });
                return res.send();
            });
        
        }catch(err){
            console.log(err);
            return res.status(500).send({ error: 'Erro ao tentar recuperar a senha' });
        }
    }
}