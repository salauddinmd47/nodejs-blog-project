const User = require("../models/User");
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');
const Flash = require("../utils/Flash");
const signupGetController = (req, res, next)=>{
    res.render('pages/auth/signup',
    {title:"Create a new Account", 
    error:{},
     value:{},
     flashMessage: Flash.getMessage(req)
    })
}
const signupPostController = async(req, res, next)=>{ 
    const {username, email, password} = req.body;
    const errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){ 
        req.flash('failed', 'Please check your form')
       return res.render('pages/auth/signup',
       {title:"Create a new Account",
        error: errors.mapped(), 
        value:{username, email, password},
        flashMessage: Flash.getMessage(req)
    })
      
    }

    try{
       
        const hashedPassword = await bcrypt.hash(password, 11) 
        const user = new User({
            username,
            email,
            password:hashedPassword
        })
        await user.save()
        req.flash('success', 'Successfully Logged IN')
        res.redirect('/auth/login')
         
    }
    catch(e){
        console.log(e)
        next(e)
    }
    
    
}
const loginGetController = async(req, res, next)=>{ 
    res.render('pages/auth/login',
     {title:"Login to your account",
      error:{},
      value:{},
      flashMessage: Flash.getMessage(req)
    })
}
const loginPostController = async(req, res, next)=>{
    const {email, password} = req.body;
    const errors = validationResult(req).formatWith(errorFormatter) 

    if(!errors.isEmpty()){
        req.flash('failed', 'Please check your form')
       return res.render('pages/auth/login',
       {title:"Create a new Account",
        error: errors.mapped(), 
        value:{  email, password},
        flashMessage: Flash.getMessage(req)
    })
      
    }
    try{
        const user = await User.findOne({email})
        
        if(!user){
            req.flash('failed', 'Please provide valid credential')
            return res.render('pages/auth/login',{
                title:'Please login to your account',
                error:{}, 
                value:{}, 
                 flashMessage:Flash.getMessage(req)
            })
             
        }
        const match = await bcrypt.compare(password, user.password)
        console.log(match)
        if(!match){
            req.flash('failed', 'Please provide valid credential')
            return res.render('pages/auth/login',{
                title:'Please login to your account',
                error:{},  
                value:{},
                flashMessage:Flash.getMessage(req)
            })
        }
   
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err=>{
           if(err){
            console.log(err)
            return next(err)
           }
           req.flash('success', 'Successfully Logged IN')
            res.redirect('/dashboard')
        })
        
        

    }catch(e){
        console.log(e)
        next(e)
    }
}
const  logoutController = (req, res, next)=>{
    req.session.destroy(err=>{
       if(err){
        console.log(err)
        return next(err)
       }
       
       return res.redirect('/auth/login')
    })
   
}
module.exports = {
    signupGetController,signupPostController, loginGetController, loginPostController, logoutController
}