const winston = require('winston');
const expressWinston = require('express-winston');
const fs = require('fs');


if(!fs.existsSync('log')){
    fs.mkdirSync('log')
}

var options = {
    file: {
      level: 'info',
      filename: 'log/server.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,

    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };


module.exports =  {
    getLogger:function(){
        return expressWinston.logger({
            transports: [
                new winston.transports.File(options.file),
                new winston.transports.Console(options.console)

         
            ],
            format:winston.format.combine(
                winston.format.simple()
            ),
            statusLevels:true,
            skip:function(req, res){
                return res.statusCode === 200;
            },
            meta: true, // optional: control whether you want to log the meta data about the request (default to true)
            msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
            
        })
    },
    
    getErrorLogger:function(){
        return expressWinston.errorLogger({
            transports:[
                new winston.transports.File({
                    filename:'log/error.log',
                    level:'error'
                })
       
            ],
            format:winston.format.combine(
                winston.format.simple()
            ),
        })
    }
    

}

