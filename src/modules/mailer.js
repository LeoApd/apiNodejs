const nodemailer = require('nodemailer');
const config = require('../config/config');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transport = nodemailer.createTransport({
    host: config.HOST,
    port: config.PORT,
    auth: {
      user: config.USER,
      pass: config.PASS
    }
});

const handlebarsOptions = {
    viewEngine: {
       /*  viewPath: './src/resources/mail', */
        extName: '.html',
        partialsDir: './src/resources/mail/',
        layoutsDir: './src/resources/mail/',
        defaultLayout: 'forgot_password.html'
    },
    viewPath: './src/resources/mail',
    extName: '.html',
}

transport.use('compile', hbs(handlebarsOptions));

module.exports = transport;