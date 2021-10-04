'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ChannelSchema = new Schema({
    name:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    admin:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    history:{
        user:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"Users" 
        },
        message:{
            type:String,
            required:true
        },
        dateTime:{
            type:String,
            required:true,
        }
    }

})

module.exports = mongoose.model('Channel', ChannelSchema);