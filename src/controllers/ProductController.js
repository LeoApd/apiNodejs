const Product = require('../models/Product');

module.exports = {
    async save (req, res) {
        const { code, name, value, amount, description } = req.body;
        try{
            if(await Product.findOne({ code })) return res.status(502).send({ error: 'Produto já cadastrado' });
            const product = await Product.create( req.body );
            res.send({ product, message: "Produto cadastrado" });
        }catch(err){
            return res.status(500).send({ error: 'Erro ao cadastrar o produto' });
        } 
    },

    async list (req, res) {
        try{
            const list = await Product.find();
            return res.send({ list })
        }catch(err){
            return res.status(500).send({ error: "Erro ao buscar os produto" })
        }
    },

    async update (req, res) {
        try{
            const checkProduct = await Product.findById(req.params.id);
            if(!checkProduct) res.status(406).send({ error: "Id digitado não existe" });
            const product = await Product.update(req.body);
            if(product) return res.send({ message: `Produto id = ${req.params.id} alterado` });
        }catch(err){
            return res.status(500).send({ error: "Erro ao tentar alterar o produto" })
        }
    },

    async delele (req, res){
        try{
            product = await Product.findOneAndDelete(req.params.id);
            if(!product) return res.status(406).send({ error:"Id digitado não foi encontrado" });
            return res.send(product);
        }catch(err){
            return res.status(500).send({ error: "Erro ao tentar deletar o produto" })
        }
    },

    async listOne (req, res){
        const { code } = req.body;
        product = await Product.findOne({ code });
        if(!product) res.status(404).send({ error: "Código do produto não encotrado" });
        return res.send(product);
    }

}

