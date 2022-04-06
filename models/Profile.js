//  user, title, bio, profilePics link:{fb, twt} posts, bookmarks

const {Schema, model} = require('mongoose');
// const Post = require('./Post');
// const User = require('./User')
const profileSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true,
        maxlength:30,
        trim:true
    },
    title:{
        type:String,
        maxlength:100,
        trim:true
    },
    bio:{
        type:String,
        maxlength:500,
        trim:true
    },
    profilePic:String,
    links:{
        website:String,
        facebook:String,
        tweeter:String,
        github:String
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    bookmarks:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }
     
},{
    timestamps:true
})
const Profile = model('Profile', profileSchema)
module.exports = Profile