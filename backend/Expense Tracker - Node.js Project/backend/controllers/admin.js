
const User = require('../models/user');

exports.postUser=async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newUser = await User.create({ username, email, password });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getlogin = async (req, res) => {
    try {
        const { email, password } = req.params; 
        const existingUser = await User.findOne({ where: { email } });
        
        if (!existingUser) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        const existingPassword = existingUser.password; 
        if (existingPassword !== password) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        return res.status(200).json({ message: 'Login successful' });
        
    } catch (error) {
        console.error('Error login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
