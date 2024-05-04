
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticate=async(req,res,next)=>{
        try{
            const token=req.header('authorization');
            const user=jwt.verify(token,'22222222222222233333333333333333333');
            
            User
                .findByPk(user.userId)
                .then((user)=>{
                    req.user=user;
                    next();
                })
        } catch(err){
            console.log(err);
            return res.status(401).json({success:false});

        }
        
}
module.exports  = {
    authenticate
};