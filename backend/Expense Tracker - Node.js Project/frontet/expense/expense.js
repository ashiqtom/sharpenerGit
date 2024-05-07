
const baseUrl = 'http://localhost:3000';

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
    console.log(token)
    const response = await axios.post(`${baseUrl}/expenses/post`, expenseObj,{headers:{"authorization":token}});
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
      await axios.delete(`${baseUrl}/expenses/${expenseDetails.id}`,{headers:{"authorization":token}});
      /*How Closures Work Here:
        The key aspect of this implementation is the use of a closure within the 
        deleteButton.onclick event handler function.
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
  listItem.appendChild(deleteButton);
  parentElem.appendChild(listItem);
}

document.getElementById('rzp-button1').onclick = async function (e) {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": token } });

    var options = {
      "key": response.data.key_id,
      "order_id": response.data.order.id,
      "handler": async function (response) {
        try {
          await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          }, { headers: { "Authorization": token } });
          document.getElementById('rzp-button1').style.display = 'none';
          document.getElementById('successMessage').style.display = 'block';
          document.getElementById('successMessage').innerHTML = 'You are a Premium User Now';
          alert('You are a Premium User Now');
        } catch (error) {
          console.error('Error updating transaction status:', error);
        }
      }, 
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', async function (response) {
      try {
        console.log(response);
        await axios.post('http://localhost:3000/purchase/updateorderstatus', {
          order_id: options.order_id,
        }, { headers: { "Authorization": token } });
        alert('Payment failed. Your order status has been updated.');
      } catch (error) {
        console.error('Error updating order status:', error);
        alert('Payment failed. Please contact support.');
      }
    });
  } catch (error) {
    console.error('Error initiating premium membership purchase:', error);
    alert('Failed to initiate premium membership purchase. Please try again.');
  }
};


window.addEventListener('DOMContentLoaded', async ()=> {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/expenses/get`,{headers:{"authorization":token}});
    const premiumStatus=await axios.get(`${baseUrl}/purchase/getStatus`,{headers:{"authorization":token}});
      
    displayPremiumStatus(premiumStatus.data);

    response.data.forEach(expense => {
      displayExpenseOnScreen(expense);
    });
    
  } catch (error) {
    console.error('Failed to load expenses:', error);
  } 
});

function displayPremiumStatus(isPremium) {
  console.log(isPremium,'>>>>>>>>>>')
  if(isPremium){
    document.getElementById('rzp-button1').style.display = 'none';
  }
  const premiumStatusElem = document.getElementById('successMessage');
  premiumStatusElem.innerHTML = isPremium ? 'You are a Premium User' : 'You are not a Premium User';
}