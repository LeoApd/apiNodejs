const Product = require('../models/Product');

module.exports = {
    async save(req, res) {
        const { code, name, value, amount, description } = req.body;
        try{
            if(await Product.findOne({ code })) return res.status(401).send({ error: 'Produto já cadastrado' });
            const product = await Product.create( req.body );
            res.send(product);
        }catch(err){
            return res.status(500).json({ error: 'Erro ao cadastrar o produto' });
        } 
    }
}

