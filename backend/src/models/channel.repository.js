'use strict';


const Channel = require('./channel.schema');
const User = require('./user.schema');

class ChannelRepository{

    // async findAll(){
    //     return await User.find({});
    // }


    async find(key){
        try {
            const query = {};
            if(key) query.name = new RegExp(key, 'i')

            return await User.find(query).populate({
                path:'admin'
            }).sort('name').limit(20).exec();
            

        } catch (error) {
            throw new Error(`Erro ao buscar canal: ${error.message}`)
        }
    }

    async findByName(name){
        try {
            const query = {
                name:name
            }
            return await this.findOne(query,{
                history:{
                    $slice:0
                }
            }).populate({
                path:"admin"
            }).exec();
        } catch (error) {
            throw new Error('Error ao tentar buscar  canal' + error.message)
        }
    }

    async findHistoryByName(name, page){
        try {
            const query = {
                name:name
            }

            const inicio = 20 * page;
            const fim = 20;
            return await this.findOne(query, {
                history:{
                    $slice:[inicio, fim]
                }
            }).populate({
                path:'admin'
            }).exec()

        } catch (error) {
            throw new Error(`Error ao buscar histórico do canal :${error.message}`)
        }
    }




    async findById(id){
        try {
            return await Channel.findById(id).exec()

        } catch (error) {
            throw new Error(`Erro ao tentar buscar por id:${error.message}`)
        }
    }



  async save(data){
      try {
        if(!data._id){
            return await Channel.create(data);
        } else {
            return await Channel.findByIdAndUpdate(data, data._id)
        }
      } catch (error) {
          throw new Error(`Erro ao tentar salvar canal :${error.message}`)
      }
  }



  async delete(channelName,id){
    try {
        const channel = await this.findByName(channelName)
        return await Channel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Erro ao excluir canal ${error.message}`);
    }
  }
}




module.exports = new ChannelRepository();


