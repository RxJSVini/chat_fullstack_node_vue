'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const winston = require('winston');
const expressWinston = require('express-winston');
const logConfig = require('./config/logConfig');
const cors = require('cors');

//VARIAVIS DE AMBIENTE
require('dotenv').config({});


//CORS
app.use(cors({
    origin:'https://127.0.0.1:8080'
}));



//LOGGER
app.use(logConfig.getLogger());

//EXPRESS BODY-PARSER
app.use(express.urlencoded({extended:false}));
app.use(express.json());



//ROTAS
app.use('/api', require('./routes'));




//TRAYAMENTO DE ERROS
app.use(logConfig.getErrorLogger());
app.use((err, req, res, next) =>{
    res.status(500).json({
        status:"error",
        message:err.message,
        data:err
    });

    return next()

    
});


//BANCO DE DADOS
mongoose.connect(process.env.DB_CONNECTION, (error) =>{
    if(error){
        console.log(error)
    }
    console.log('Banco de dados conectado com sucesso!');
});

app.listen(process.env.PORT, () => console.log(`Servidor rodando em ${process.env.PORT}`));