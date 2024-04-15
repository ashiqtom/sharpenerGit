// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  try {
    const response = await axios.post("http://localhost:3000/api/users", userDetails);

    displayUserOnScreen(response.data);
    
    // Clearing the input fields after successful submission
    event.target.username.value = "";
    event.target.email.value = "";
    event.target.phone.value = "";
  } catch (error) {
    console.log(error);
  }
}

// Function to fetch and display users on page load
window.addEventListener("DOMContentLoaded", async () => {
  try {
      const response = await axios.get('http://localhost:3000/admin/products');
      response.data.forEach(userDetails => {
        displayUserOnScreen(userDetails);
    });
  } catch (error) {
    console.log(error);
  }
});

// Function to display a user on screen
function displayUserOnScreen(userDetails) {
  const userList = document.querySelector("ul");
  const userItem = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");

  userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;
  
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", async () => {
    try {
      await axios.delete(`https://crudcrud.com/api/7eb63f38fb8242ca9227ca7b3e92f7be/appointmentData/${userDetails._id}`);
      userList.removeChild(userItem);
    } catch (error) {
      console.log(error);
    }
  });

  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", (event) => {
    userList.removeChild(event.target.parentElement);
    localStorage.removeItem(userDetails.email);
    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
  });

  userItem.appendChild(deleteBtn);
  userItem.appendChild(editBtn);
  userList.appendChild(userItem);
}

// Export the handleFormSubmit function
module.exports = handleFormSubmit;
