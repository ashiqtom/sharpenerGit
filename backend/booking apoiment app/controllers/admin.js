const User = require('../models/user');

exports.postUser=async (req, res) => {
    const { username, email, phone } = req.body;
    try {
      const user = await User.create({ username, email, phone });
      res.status(201).json(user);
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
  
exports.getUser=(req, res) => {
    User.findAll() 
      .then(users => {
        res.status(200).json(users); 
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
      });
    }
  
exports.deleteUser= (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
      .then(user => {
        if (!user) {
          console.log('User not found:', userId);
          return res.status(404).json({ error: 'User not found' });
        }
        return user.destroy(); 
      })
      .then(result => {
        res.status(204).end(); 
      })
      .catch(err => {
        console.log('Error deleting user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }