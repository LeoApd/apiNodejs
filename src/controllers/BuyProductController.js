const BuyProduct = require('../models/BuyProduct');
const Product = require('../models/Product');
const mongoose = require('mongoose');

module.exports = {

    async buyItem (req, res){
        try{
            const product = await Product.findById(req.params.id);
            const { productQuantity } = req.body;
            const value = productQuantity * product.value;

            if(!productQuantity || !value ) return res.send({ error: 'Quantidade do produto esta vazia' });
            if(productQuantity > product.amount) return res.send({ error: 'Quantidade desejada é maior que á no estoque' });

            const buyProduct = await BuyProduct.create({
                dateBuy: new Date,
                productQuantity: productQuantity,
                valueBuy: value,
                productId: product._id,
                userId: req.userId
            });

            product.amount -= productQuantity;
            await product.save();

            return res.send({ buyProduct, message: 'Pedido concluido' });
        }catch(err){
            return res.status(500).send({ error: 'Erro ao tentar realizar um  pedido' }) ;
        }
    },

    async myOrder (req, res) {
        try{
            const list = await BuyProduct.find({ userId: req.userId });
            if(!list) return res.send({ error: 'Nenhum pedido encontrado' });
            return res.send({ list });
        }catch(err){
            return res.status(500).send({ error: 'Erro ao buscar os pedidos' });
        }
    },

    async cancelOrder (req, res) {
        try{
            const order = await BuyProduct.findByIdAndDelete( req.params.id );
            if(!order) return res.send({ error: 'Pedido não encontrado' });
            return res.send({ message: 'Pedido cancelado' })
        }catch( err ) {
            res.status(500),send({ error: 'Erro ao cancelar pedido' })
        }
    }
}