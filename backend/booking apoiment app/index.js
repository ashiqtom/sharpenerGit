const BASE_URL = 'http://localhost:3000/api/users';

async function handleFormSubmit(event) {
  event.preventDefault();
  
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  try {
    const response = await axios.post(BASE_URL, userDetails);
    displayUserOnScreen(response.data);
    
    event.target.username.value = "";
    event.target.email.value = "";
    event.target.phone.value = "";
  } catch (error) {
    console.error('Registration failed:', error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
      const response = await axios.get(BASE_URL);
      response.data.forEach(userDetails => {
        displayUserOnScreen(userDetails);
    });
  } catch (error) {
    console.log(error);
  }
});

function displayUserOnScreen(userDetails) {
  const userList = document.querySelector("ul");
  const userItem = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  
  userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;

  const userIdInput = document.createElement("input");
  userIdInput.type = "hidden";
  userIdInput.name = "userId";
  userIdInput.value = userDetails.id; 
  userItem.appendChild(userIdInput);
  
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", async () => {
    try {
      const userId = userItem.querySelector('input[name="userId"]').value;
      await axios.delete(`${BASE_URL}/${userId}`);

      userList.removeChild(userItem);
    } catch (error) {
      console.log(error);
    }
  });

  editBtn.textContent = "Edit";
    
  editBtn.addEventListener("click", async() => {
    try {
      document.getElementById("username").value = userDetails.username;
      document.getElementById("email").value = userDetails.email;
      document.getElementById("phone").value = userDetails.phone;

      const userId = userItem.querySelector('input[name="userId"]').value;
      await axios.delete(`${BASE_URL}/${userId}`);

      userList.removeChild(userItem);
    } catch (error) {
      console.log(error);
    }
  });

  userItem.appendChild(deleteBtn);
  userItem.appendChild(editBtn);
  userList.appendChild(userItem);
}