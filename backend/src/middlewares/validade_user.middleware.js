const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
class ValidadeUser{
    async validadeToken(req, res, next){
        try{
            const token = req.headers.authorization;
            const [_, baerer ]= token.split(" ")
            const decoded = await jwt.verify(baerer , jwtConfig.secret);
            req.body.userId = decoded.id;
            return next()


        }catch(error){
            return res.status(401).json({
                status:'error',
                message:'Error ao validar token' + error.message,
                data:null
            })
        }
    }
}


module.exports = new ValidadeUser();