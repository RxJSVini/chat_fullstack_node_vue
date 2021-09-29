const express = require('express');
const app = express();

const winston = require('winston');
const expressWinston = require('express-winston');

app.use(expressWinston.logger({
    transports:[
        new winston.transports.File({filename:'chat.log'})
    ],
    format:winston.format.combine(
        winston.format.simple()
    
    ),
    meta:true,
    msg:"HTTP {{req.method}} {{req.url}}",
    expressFormat:true,
    colorize:false,
    ignoreRoute:(req, res) =>{ return false; }

}));

