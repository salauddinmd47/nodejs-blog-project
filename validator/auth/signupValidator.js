const { body } = require('express-validator');
const User = require('../../models/User');

module.exports =[
    body('username')
    .isLength({min:3, max:15}).withMessage('username should be between 2 to 15 characters')
    .custom( async username=>{
        const userName = await User.findOne({username});
        if(userName){
            return Promise.reject('username already exist')
        }
    }).trim(),

    body('email')
    .isEmail().withMessage('please enter a valid email')
     .custom(async email=>{
         const userEmail = await User.findOne({email});
         if(userEmail){
            return Promise.reject('Email already exist')
         }
     })
     .normalizeEmail(),

     body('password')
     .isLength({min:5}).withMessage("Password must be greater than 5 characters"),

     body('confirmPassword')
     .isLength({min:5}).withMessage("Password must be greater than 5 characters")
     .custom((confirmPassword, {req})=>{
         if(confirmPassword !== req.body.password){
          throw new Error('Password does not match')
         }
        return true;
     }
    
     )
]