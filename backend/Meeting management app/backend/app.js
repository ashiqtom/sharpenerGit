const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('node-complete', 'root', 'shibu@500', {
  dialect: 'mysql',
  host: 'localhost'
});

// Define MeetingSchedule model
const MeetingSchedule = sequelize.define('MeetingSchedule', {
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slots: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Define Booking model
const Booking = sequelize.define('Booking', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  place: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Booking.beforeCreate(async (booking, options) => {
//   const meetingSchedule = await MeetingSchedule.findOne({
//     where: { time: booking.time }
//   });

//   if (meetingSchedule) {
//     if (meetingSchedule.slots > 0) {
//       meetingSchedule.slots -= 1;
//       await meetingSchedule.save();
//     } else {
//       throw new Error('No slots available for this meeting time.');
//     }
//   } else {
//     throw new Error('Invalid meeting time.');
//   }
// });

// Endpoint to fetch meeting schedules


// // Endpoint to handle booking
// app.post('/api/book-meeting', async (req, res) => {
//   const { name, place, time } = req.body;

//   try {
//     const booking = await Booking.create({ name, place, time });
//     res.status(201).json({ message: 'Booking successful', booking });
//   } catch (error) {
//     console.error('Error booking meeting:', error);
//     res.status(400).json({ error: 'Booking failed' });
//   }
// });
app.post('/api/book-meeting', async (req, res) => {
  const { name, place, time } = req.body;

  try {
    const meetingSchedule = await MeetingSchedule.findOne({
      where: { time: time }
    });
  
    if (meetingSchedule) {
      if (meetingSchedule.slots > 0) {
        meetingSchedule.slots -= 1;
        await meetingSchedule.save();
      } else {
        throw new Error('No slots available for this meeting time.');
      }
    } else {
      throw new Error('Invalid meeting time.');
    }

    const booking = await Booking.create({ name, place, time });
    res.status(201).json({ message: 'Booking successful', booking });
    
  } catch (error) {
    console.error('Error booking meeting:', error);
    res.status(400).json({ error: 'Booking failed' });
  }
});

app.get('/api/meeting-schedules', async (req, res) => {
  try {
    const meetingSchedules = await MeetingSchedule.findAll();
    res.json(meetingSchedules);
  } catch (error) {
    console.error('Error fetching meeting schedules:', error);
    res.status(500).json({ error: 'Error fetching meeting schedules' });
  }
});

// Endpoint to fetch all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Endpoint to cancel a booking
app.delete('/api/bookings/:id', async (req, res) => {
  const bookingId = req.params.id;
  console.log(bookingId,'```````````````````')

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Get the associated meeting schedule
    const meetingSchedule = await MeetingSchedule.findOne({
      where: { time: booking.time }
    });

    if (meetingSchedule) {
      meetingSchedule.slots += 1; // Increment slots
      await meetingSchedule.save();
    }

    // Delete the booking
    await booking.destroy();
    res.json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ error: 'Error canceling booking' });
  }
});



// Sync Sequelize models with the database
sequelize
  .sync()
  //.sync({ force: true }) // Use { force: true } to drop tables and re-create them
  .then(result => {
    return MeetingSchedule.findByPk(1);
  })
  .then((name) => {
    if(!name){
      return MeetingSchedule.bulkCreate([
        { time: '10:00 AM', slots: 4 },
        { time: '2:00 PM', slots: 4 },
        { time: '4:30 PM', slots: 4 },
        { time: '6:00 PM', slots: 4 }
      ])
    }
    return name
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Database sync error:', err);
  });