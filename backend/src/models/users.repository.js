const User = require('./user.schema');

class UserRepository{
    async find(){}
    async findByName(name){}



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


module.exports = new UserRepository();


