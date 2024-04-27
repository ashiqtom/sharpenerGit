const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors'); 
const app = express();

app.use(bodyParser.json());
app.use(cors()); 

const sequelize = new Sequelize('node-complete', 'root', 'shibu@500', {
  dialect: 'mysql',
  host: 'localhost'
});

const Player = sequelize.define('Player', {
  name: DataTypes.STRING,
  scores: DataTypes.INTEGER,
  description: DataTypes.TEXT,
  photoLink: DataTypes.STRING
});

app.post('/players', async (req, res) => {
  try {
    const { name, scores, description, photoLink } = req.body;
    console.log(req.body)
    const newPlayer = await Player.create({ name, scores, description, photoLink });
    res.json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/players/name/:name', async (req, res) => {
  try {
    const playerName = req.params.name;
    const player = await Player.findOne({ where: { name: playerName } });
      res.json(player);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/players/id/:id', async (req, res) => {
    try {
      const playerId = req.params.id;
      
      const player = await Player.findByPk(playerId);
        res.json(player);
      
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.delete('/players/:id', async (req, res) => {
    try {
      const playerId = req.params.id;
      const player = await Player.findByPk(playerId);
      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }
      await player.destroy();
  
      res.json({ message: 'Player deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  

sequelize
    //.sync({force:true})
    .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
