const User = require('../models/User');

module.exports = {
    async create (req, res) {
        const { cpf } = req.body;
        if(await User.findOne({ cpf })) return res.status(400).send({ error: "Cpf já cadastrado" });
        const user = await User.create(req.body);
        return res.send({ user, message: "Usuário cadastrado com sucesso" });
    }
}