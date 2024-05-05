const baseUrl = 'http://localhost:3000/expenses';

async function handleFormSubmit(event) {
  event.preventDefault();

  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  const expenseObj = {
    amount: amount,
    description: description,
    category: category
  };
  try {
    
    const token = localStorage.getItem('token');
    
    const response = await axios.post(`${baseUrl}/post`, expenseObj,{headers:{"authorization":token}});
    displayExpenseOnScreen(response.data);
    event.target.reset();
  } catch (error) {
    console.error('Expense addition failed:', error);
  }
}

async function displayExpenseOnScreen(expenseDetails) {
  const parentElem = document.getElementById('expenseList');
  const listItem = document.createElement('li');
  listItem.textContent = `${expenseDetails.amount} - ${expenseDetails.description} - ${expenseDetails.category}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/${expenseDetails.id}`,{headers:{"authorization":token}});
      /*How Closures Work Here:
        The key aspect of this implementation is the use of a closure within the 
        deleteButton.onclick event handler function:
        
        deleteButton.onclick = async () => {
          try {
            await axios.delete(`${baseUrl}/${expenseDetails.id}`);
            parentElem.removeChild(listItem);
          } catch (error) {
            console.error('Delete failed:', error);
          }
        };
        The arrow function assigned to deleteButton.onclick captures and retains access 
        to the expenseDetails object from the outer scope of displayExpenseOnScreen.
        This means that when the delete button is clicked, the event handler 
        function still has access to expenseDetails, including expenseDetails.id,
        allowing it to make the DELETE request with the correct expense ID.*/
      parentElem.removeChild(listItem);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  // const editButton = document.createElement('button');
  // editButton.textContent = 'Edit';
  // editButton.onclick = async()=>{
  //   try {
  //     document.getElementById("amount").value = expenseDetails.amount;
  //     document.getElementById("description").value = expenseDetails.description;
  //     document.getElementById("category").value = expenseDetails.category;
  //     await axios.delete(`${baseUrl}/${expenseDetails.id}`);
  //     parentElem.removeChild(listItem);
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }

  listItem.appendChild(deleteButton);
  //listItem.appendChild(editButton);
  parentElem.appendChild(listItem);
}

document.addEventListener('DOMContentLoaded', async ()=> {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/get`,{headers:{"authorization":token}});
    response.data.forEach(expense => {
      displayExpenseOnScreen(expense);
    });
  } catch (error) {
    console.error('Failed to load expenses:', error);
  }
});