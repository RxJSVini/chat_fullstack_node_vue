'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const winston = require('winston');
const expressWinston = require('express-winston');
const logConfig = require('./config/logConfig');
const cors = require('cors');

//Cors
app.use(cors({
    origin:'*'
}))

//LOGER DE ERROS
app.use(logConfig.getLogger());
app.use((err, req, res, next) =>{
    return res.status(500).json({
        status:"error",
        message:err.message,
        data:err
    })
})

//VARIAVIS DE AMBIENTE
require('dotenv').config({});



app.get('/', (req, res) =>{
    return res.send('ok')
})


//EXPRESS BODY-PARSER
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//BANCO DE DADOS
mongoose.connect(process.env.DB_CONNECTION, (error) =>{
    if(error){
        console.log(error)
    }
    console.log('Banco de dados conectado com sucesso!');
});

app.listen(process.env.PORT, () => console.log(`Servidor rodando em ${process.env.PORT}`))









