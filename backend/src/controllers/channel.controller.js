'use strict';
const UserRepository = require('../models/users.repository');


require('dotenv').config({});



class ChannelController{
    async create(req, res, next){
        try {
            const admin = await User.findById(req.body.userId);
            const channel = await Channel.create({
                name:req.body.name,
                admin:admin
            })

            return res.status(201).json({
                status:'success',
                message:'Canal criado com sucesso!',
                data:{
                    name:channel.name,
                    admin:admin.name
                }
            })
     
        } catch (error) {
            // throw new Error(`Ocorreu um erro na criação do canal ${error}`)
            next(error);
        }

    }
}


module.exports = new UserController();