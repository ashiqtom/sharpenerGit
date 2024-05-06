const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenticate=async(req,res,next)=>{
    try{
        const token=req.header('authorization');
        const user=jwt.verify(token,'secretkey');
        //The decoded payload (containing user information) is stored in the user variable.
        
        const userDetails=await User.findByPk(user.userId)
        req.user=userDetails;
        next();
    } catch(err){
        console.log(err); 
        return res.status(401).json({success:false});
    }
}