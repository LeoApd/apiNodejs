const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev' :
        return {
            bd_string: 'mongodb+srv://user_admin:357159@cluster0-piatq.mongodb.net/test?retryWrites=true&w=majority',
            JWT_SECRET: 'melancia',
            JWT_EXPIRES_IN: '7d',
            HOST: 'smtp.mailtrap.io',
            PORT: '2525',
            USER: 'd147f2514a5706',
            PASS: '40c7ce3e0a8298'
        }
        case 'html':
        return{
            bd_string: 'mongodb+srv://user_admin:357159@cluster0-piatq.mongodb.net/test?retryWrites=true&w=majority' 
        }
        case 'prod':
        return{
            bd_string: 'mongodb+srv://user_admin:357159@cluster0-piatq.mongodb.net/test?retryWrites=true&w=majority' 
        }
    }
}
console.log(`Iniciando a API em ambiente de ${env.toUpperCase()}`);
module.exports = config();