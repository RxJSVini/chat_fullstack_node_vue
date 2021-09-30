'use strict';
const User = require('./channel.schema');

class ChannelRepository {
    async find(key){
        try {

            let query = {};
            if(key){
                let key = new RegExp(key, 'i');
                query.name = key;
            }

            return await User.find(query).sort('name')
            .limit(20).exec()
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`)
        }
    }



    async findByName(name){
        try {
            let query = {};
            if(name){
                let key = new RegExp(name, 'i');
                query.name = key;
            }
            return await this.find(query);
        } catch (error) {
            throw new Error(`Erro ao buscar usuário por nome : ${error.message}`)
        }
    }



    async findByEmail(email){
        try {
            return await User.findOne({ where: {email:email}});

        } catch (error) {
            throw new Error(`Erro ao pesquisar email ${error.message}`);
        }
    }
    async findById(id){}



    async save(data){
        try {
            if(!data._id){
                return await User.create(data)
            } else {
                return await User.findByIdAndUpdate(data._id, data);
            }
        } catch (error) {
            throw new Error(`Erro ao salvar usuário ${error.message}`);
        }
    }
    async delete(id){
        try {
            return await User.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(`Erro ao excluir usuário ${error.message}`);
        }
    }

}


module.exports = new ChannelRepository();


