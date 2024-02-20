const express = require('express');
const router = express.Router();
const {User,Account } = require('../db/UserSchema');
const zod = require('zod');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/balance' ,authMiddleware, async (req,res)=>{
    const account =await Account.findOne({
        userId : req.userId
    })

    if(!account){
        res.json({
            msg:'Error fetching balance'
        })
        return;
    }
    res.status(200).json({
        balance : account.balance
    })
    
})


const transferBody = zod.object({
    to : zod.string(),
    amount : zod.number()
})

router.post('/transfer',authMiddleware, async(req,res)=>{

    //converting this to transaction to maintain ACID properties

    const {success} = transferBody.safeParse(req.body);
    console.log('success',success);
    if(success){
        const acc = await Account.findOne({
            userId : req.body.to
        })
        if(!acc){
            res.status(400).json({
                msg : "insufficient funds"
            })
            return;
        }
        await Account.updateOne({
            userId : req.userId
        },{
            $inc : {
                balance : -req.body.amount
            }
        });

        await Account.updateOne({
            userId : req.body.to
        },{
            $inc: {
                balance : req.body.amount
            }
        })

        return res.json({
            msg : 'Transaction Successfull'
        })
    }
    res.status(400).json({
        msg: 'Invalid Account'
    });
})

module.exports = router;