const express = require('express');
const router = express.Router();
const zod = require('zod');
const {User } = require('../db/UserSchema');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const { authMiddleware } = require('../middleware');

const signUpBody = zod.object({
    username : zod.string(),
    firstname : zod.string(),
    lastname : zod.string(),
    password : zod.string(),
})

router.post('/signup',async(req, res )=>{
    const {success} = signUpBody.safeParse(req.body);   
    if(!success){
        return res.status(411).json({
            message: "email already taken /Incorrect " 
        })
    }
    
    const existingUser = await User.findOne({
        username : req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message : "Email already taken "
        })
    }



    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    })

    const userId = user._id;

    const token = jwt.sign({
        userId,
    },JWT_SECRET);
    
    res.json({
        message: "user created successfully",
        token: token
    })
})

const signInBody = zod.object({
    username : zod.string(),
    password : zod.string()
})

router.post('/signin' , async (req,res)=>{
    const {success} = signInBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message : 'Invalid credentials huh'
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if(user){
        const token = jwt.sign({
            userId: user._id,
        },JWT_SECRET);
        res.json({
            token : token
        })
        return;
    }

    res.status(411).json({
        message : 'Error While logging in'
    })


})

const updateSchema = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password : zod.string().optional()
})


router.put('/update' ,authMiddleware, async (req,res)=>{
    const {success,data} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg: 'Invalid inputs',
        })
    }

    const query = {_id: req.userId};

    const updateFields = {
        firstname : data.firstname,
        lastname : data.lastname,
        password : data.password
    }


    try {
        const result = await User.updateOne(query,updateFields);
        //console.log(result);
        if(result.modifiedCount >0){
            res.json({msg:'updated successfully'});
        }else{
            res.json({msg: 'No changes were made!'});
        }
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error",
        });
    }
    
})


//-----get route
router.get('/bulk', async (req,res)=>{
    const filter = req.query.filter || '';
    
    try{
        const users = await User.find({
            $or :[
                {
                    firstname : {
                        '$regex' : filter
                    }
                },
                {
                    lastname : {
                        "$regex" : filter
                    }
                },
            ]
        })
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstname,
                lastName: user.lastname,
                _id: user._id
            }))
        })
    }catch(erorr){
        console.error('error while fetching record',error);
        return res.status(411).json({msg: 'Record not found'});
    }
    
})


module.exports = router;

