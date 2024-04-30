const Player = require('../models/players');

exports.getPlayerByName=async (req, res) => {
    try {
      const playerName = req.params.name;
      const player = await Player.findOne({ where: { name: playerName } });
        res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

exports.getPlayerById=async (req, res) => {
    try {
      const playerId = req.params.id;
      
      const player = await Player.findByPk(playerId);
        res.json(player);
      
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

exports.postPlayer= async (req, res) => {
    try {
      console.log('````````````````',req.body)
      const { name, scores, description, photoLink } = req.body;
      const newPlayer = await Player.create({ name, scores, description, photoLink });
      console.log(newPlayer);
      res.json(newPlayer);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }

exports.deletePlayer=async (req, res) => {
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
  }