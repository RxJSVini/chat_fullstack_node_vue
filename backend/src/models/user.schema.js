const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;

const saltRounds = 10;


const UserSchema = new Schema({

    email:{
        type:String,
        require:true,
        index:{
            unique:true
        }
    },


    name:{
        
    }


});








