const baseURL = 'http://localhost:3000'; 

    document.getElementById('playerForm').addEventListener('submit', async (event) => {
      try {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const playerData = Object.fromEntries(formData.entries());

        const response = await axios.post(`${baseURL}/players`, playerData);
        alert('Player added successfully:');

        event.target.reset();
      } catch (error) {
        console.error('Error adding player:', error.response.data);
        alert('Failed to add player. Please try again.');
      }
    });

    async function searchPlayer() {
      try {
        const playerName = document.getElementById('searchInput').value.trim();
        const response = await axios.get(`${baseURL}/players/name/${playerName}`);
        const player = response.data;

        document.getElementById('playerDetails').innerHTML = `
          <img src="${player.photoLink}" alt="${player.name}" width="200">
          <h3>${player.name}</h3>
          <p>Scores: ${player.scores}</p>
          <p>Description: ${player.description}</p>
          <button onclick="populateEditForm(${player.id})">Edit</button>
        `;

        document.getElementById('searchInput').value = ''; 
      } catch (error) {
        console.error('Player not found or error:', error.response.data);
        document.getElementById('playerDetails').innerHTML = '<p>Player not found</p>';
      }
    }

    async function populateEditForm(playerId) {
      try {
        const response = await axios.get(`${baseURL}/players/id/${playerId}`);
        const player = response.data;

        // document.getElementById('name').value = player.name;
        // document.getElementById('scores').value = player.scores;
        // document.getElementById('description').value = player.description;
        // document.getElementById('photoLink').value = player.photoLink;

        for (const key in player) {
          const element = document.getElementById(key);
          if (element) {
            element.value = player[key];
          }
        }

        await axios.delete(`${baseURL}/players/${playerId}`);
        document.getElementById('playerDetails').innerHTML = ''; 
      } catch (error) {
        console.error('Error fetching player data:', error.response.data);
        alert('Player not found or error fetching data. Please try again.');
      }
    }