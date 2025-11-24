const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// router.get('/test',(req,res)=>{
//         res.send("user test route")
// })

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',
    body('name').trim().isLength({min:3}).withMessage("Name must be at least 3 characters long"),
    body('email').trim().isEmail().withMessage("Enter a valid email"),
    body('password').isLength({min:5}).withMessage("Password must be at least 5 characters long"),
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        // res.send("User registered successfully")
        const {name,email,password} = req.body
        const newUser = await userModel.create({name,email,password:bcrypt.hashSync(password,10)})
    res.json(newUser)
    })

router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',
    body('email').trim().isEmail().isLength({ min: 10 }),
    body('password').isLength({min:5}),
    async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        const {email,password} = req.body
        const user = await userModel.findOne({
            email:email
        })
        if(!user){
            return res.status(400).json({msg:"Invalid email or password"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:"Invalid email or password"})
        }
        const token=jwt.sign({userid:user._id,email:user.email},
            process.env.JWT_SECRET,
        )
        //res.json({token,user})
        //res.cookie('token', token, { httpOnly: true }).json({ token, user, msg: "Login successful" });
        res.cookie('token',token)
        res.send("Login successful")
    }
)
module.exports = router