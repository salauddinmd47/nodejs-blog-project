
// post , user, bodies, replies 
const {Schema, model} = require('mongoose')
const Post = require('./Post')
const User = require('./User')
const commentSchema = new Schema({

    post:{
        type:Object.Types.ObjectId,
        ref:Post,
        required:true
    },
    user:{
        type:Object.Types.ObjectId,
        ref:User,
        required:true
    },
    body:{
        type:String,
        trim:true,
        required:true
    },
    replies:[
        {
            body:{
                type:String,
                required:true,
            },
            user:{
                type:Schema.Types.ObjectId,
                ref:User,
                required:true
            },
            createdAt:{
                type: Date,
                default: new Date(),
            }
        }
    ],


})
const Comment = model('Comment', commentSchema);
module.export = Comment;