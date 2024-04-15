const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors()); 

//const sequelize = require('./util/database');
//const User = require('./models/user');

const Sequelize=require('sequelize');

const sequelize=new Sequelize('node-complete','root','shibu@500',{
    dialect:'mysql',
    host:'localhost'
});


const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING, 
    allowNull: false
  }
});

app.post('/api/users', async (req, res) => {
  const { username, email, phone } = req.body;
  try {
    const user = await User.create({ username, email, phone });
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users', (req, res) => {
  User.findAll() 
    .then(users => {
      res.status(200).json(users); 
    })
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});

app.delete('/api/users/:userId', (req, res, next) => {
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
});

sequelize.sync() 
  .then(() => {
    app.listen(3000, () => {
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });





