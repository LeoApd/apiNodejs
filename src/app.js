//import dependencia
const express = require('express');//importanto dependencia do express
const mongoose = require('mongoose')//importando dependencia do mongo
const bodyParser = require('body-parser');

//import arquivos internos
const config = require('./config/config');//importando as configuranção
/* const productRoute = require('./routes/products');//importando routa do produto */

const app = express();

const url = config.bd_string; //pegar a url de conexão na config

//conectar com o banco de dados
const options = {
    useNewUrlParser: true,
    useCreateIndex: true
}
mongoose.connect(url, options);
mongoose.connection.on('error', (err) => {
    console.log('Erro ao conectar com o banco de dados ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Banco de dados desconectado');
});
mongoose.connection.on('connected', () => {
    console.log('Banco de dados conectado');
});

//preciso do bodyparser para trador dos dados no corpo da requisição(outra opção e o multer)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* app.use((req, res, next) => {
    next();
}); */

//configurar route
app.use(require('./routes/products'));

app.listen(3333);//adicionando a porta da aplicação
