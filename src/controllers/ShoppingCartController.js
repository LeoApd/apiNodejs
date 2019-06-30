const ShoppingCart = require('../models/ShoppingCart');
const Product = require('../models/Product');

module.exports = {

    async addCart (req, res) {
        try{
            const product = await Product.findById(req.params.id);
            if(!product) return res.send({ error: 'Produto não encontrado' });

/*             const checkShopping = await ShoppingCart.find({ productId:req.params.id });
            if(checkShopping) return res.send({ error: 'Produto já esta adicionado no carrinho' }); */
            const cart = await ShoppingCart.create({
                userId: req.locals.id,
                productId: req.params.id
            });
            if(!cart) return res.send({ error: 'Produto não adicionado no carriinho' });
            return res.send({ cart });
        }catch(err){
            return res.status(500).send({ error: 'Erro ao salvar produto ao carrinho' + err})
        }
    },

    async removeCart (req, res) {
        try{
            const findCart = await ShoppingCart.find({ productId:req.params.id });
            const cart = await ShoppingCart.findByIdAndDelete(findCart[0]._id);
            if(!cart) return res.send({ error: 'Produto não encontrado no carrinho' });
            return res.send({ message: 'Produto excluido do carrinho ', cart });
        }catch(err){
            return res.status(500).send({ error: 'Erro ao remover produto do carrinho' + err })
        }
    }

}

