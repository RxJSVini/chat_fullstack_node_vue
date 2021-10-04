'use strict';
const UserRepository = require('../models/users.repository');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

require('dotenv').config({});




class UserController{

    async index(req, res, next){
        try{
            const users = await UserRepository.findAll();
            return res.status(200).json(users);
        }catch(error){
            next(error);
        }

    }
    

    async create(req, res, next){
        const saltRounds = 10;
        const { name, email, password  } = req.body;

        try {
            const hash_password  = await bcryptjs.hash(password, saltRounds)
            let user = await UserRepository.save({
                name:name,
                email:email,
                password:hash_password
            })


            return res.status(200).json({
                status:"success", 
                message:"Usuário criado com sucesso!", 
                data:{
                    name:user.name,
                    email:user.email
                }
            });
        } catch (error) {
            next(error);
        }
    }




    async authenticate(req, res){
        const { email, password } = req.body;
        try {
            let user = await UserRepository.findByEmail(email);
            if(!user){
                return res.status(404).json({
                    status:"error",
                    message:"Usuário ou e-mail não localizado.",
                    data:null
                })
            } else {

                let passwordIsValid = await bcryptjs.compare(password, user.password)
                if(!passwordIsValid){
                    return res.status(401).json({
                        status:"error",
                        message:"Senha não confere!",
                        data:null
                    })
                }
                
                const token = jwt.sign({
                    id:user._id,
                },

                 jwtConfig.secret,{
                     expiresIn:jwtConfig.expiresIn
                 })


                 return res.status(200).json({
                     status:"sucess",
                     message:"Usuário autenticado com sucesso",
                     data:{
                         user:{
                             name:user.name,
                             email:user.email,
                             token
                         }
                     }
                 })
               
            }

        } catch (error) {
            throw new Error(`Usuário ou senha não localizado ${error.message}`)
        }
    }
}


module.exports = new UserController();