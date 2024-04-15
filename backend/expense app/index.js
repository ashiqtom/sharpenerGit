const baseUrl = 'http://localhost:1000/api/expenses';

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
    const response = await axios.post(baseUrl, expenseObj);
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
      await axios.delete(`${baseUrl}/${expenseDetails.id}`);
      parentElem.removeChild(listItem);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = async()=>{
    try {
      document.getElementById("amount").value = expenseDetails.amount;
      document.getElementById("description").value = expenseDetails.description;
      document.getElementById("category").value = expenseDetails.category;
      await axios.delete(`${baseUrl}/${expenseDetails.id}`);
      parentElem.removeChild(listItem);
    } catch (error) {
        console.log(error);
    }
  }

  listItem.appendChild(deleteButton);
  listItem.appendChild(editButton);
  parentElem.appendChild(listItem);
}

document.addEventListener('DOMContentLoaded', async ()=> {
  try {
    const response = await axios.get(baseUrl);
    response.data.forEach(expense => {
      displayExpenseOnScreen(expense);
    });
  } catch (error) {
    console.error('Failed to load expenses:', error);
  }
});