const User = require('../models/user');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signupUser=async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ err: 'Email already exists' });
        }
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltrounds); //blowfish 

        await User.create({ username, email, password:hashedPassword});
        res.status(201).json({message: 'Successfuly create new user'});

    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ err: 'Internal server error' });
    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, password} = req.params; 
        const existingUser = await User.findOne({ where: { email } });
        
        if (!existingUser) {
            return res.status(404).json({ err: 'Invalid email' });
        }
        const passwordCompared=await bcrypt.compare(password,existingUser.password);

        if(passwordCompared){
            return res.status(200).json({ success: true, message: "User logged in successfully",token: generateAccessToken(existingUser.id,existingUser.username)});
        }else{
            return res.status(400).json({success: false, err: 'Password is incorrect'});
        }
    } catch (err) {
        console.error('Error login:', err);
        return res.status(500).json({err: err, success: false});
    }
};

const generateAccessToken=(id,name)=>{
    return jwt.sign({userId:id,name:name},'secretkey')
};