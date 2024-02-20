const express = require('express');
const router = express.Router();
const {User,Account } = require('../db/UserSchema');
const zod = require('zod');
const { authMiddleware } = require('../middleware/authMiddleware');
const { default: mongoose } = require('mongoose');

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

    const session = await mongoose.startSession();
    session.startTransaction();

    const {success} = transferBody.safeParse(req.body);
    
    if(success){
        const acc = await Account.findOne({
            userId : req.body.to
        }).session(session);//passing this session in this transaction
        if(!acc){
            session.abortTransaction();
            return res.status(400).json({
                msg : "insufficient funds"
            });
        }
        await Account.updateOne({
            userId : req.userId
        },{
            $inc : {
                balance : -req.body.amount
            }
        }).session(session);

        await Account.updateOne({
            userId : req.body.to
        },{
            $inc: {
                balance : req.body.amount
            }
        }).session(session);

        await session.commitTransaction();//commiting the transaction after successfull transfer of balance

        return res.json({
            msg : 'Transaction Successfull'
        })
    }
    session.abortTransaction();
    return res.status(400).json({
        msg: 'Invalid Account'
    });

})


module.exports = router;