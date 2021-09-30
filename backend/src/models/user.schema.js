'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({

    email:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },


    name:{
        type:String,
        require:true
    },

    password:{
        type:String,
        required:true
    }

})


/*UserSchema.pre('Save', (next) =>{
    this.password = bcryptjs.hashSync(this.password, saltRounds)
    next()
})*/


module.exports = mongoose.model('Users', UserSchema);