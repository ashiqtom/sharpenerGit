const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const mysql2 = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize=new Sequelize('node-complete','root','shibu@500',{
    dialect :'mysql',
    host:'localhost',
    dialectModule: mysql2, // Use mysql2 module
});

const Post = sequelize.define('Post', {
    imageLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Comment = sequelize.define('Comment', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Post.hasMany(Comment);
Comment.belongsTo(Post);


app.get('/posts', async (req, res) => {
    const posts = await Post.findAll({ include: Comment });
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const { imageLink, description } = req.body;
    try {
        const post = await Post.create({ imageLink, description });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/comments', async (req, res) => {
    const { postId, text } = req.body;
    try {
        const comment = await Comment.create({ PostId: postId, text });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


sequelize
    //.sync({ force: true })
    .sync()
    .then(() => {
        console.log('Database & tables created!');
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });
    });
