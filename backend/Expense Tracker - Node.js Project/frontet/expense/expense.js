
const baseUrl = 'http://localhost:3000';


window.addEventListener('DOMContentLoaded', async () => {
  try {
    const token = localStorage.getItem('token');

    const promise1 = axios.get(`${baseUrl}/expenses/get`, { headers: { "authorization": token } });
    const promise2 = axios.get(`${baseUrl}/purchase/getStatus`, { headers: { "authorization": token } });
   
    const [expensesResponse, premiumStatusResponse] = await Promise.all([promise1, promise2]);

    const expenses = expensesResponse.data;
    const premiumStatus = premiumStatusResponse.data.status;
    displayPremiumStatus(premiumStatus);

    expenses.forEach(expense => {
      displayExpenseOnScreen(expense);
    });

  } catch (error) {
    console.error('Failed to load expenses or premium status:', error);
  }
});

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
      parentElem.removeChild(listItem);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };
  listItem.appendChild(deleteButton);
  parentElem.appendChild(listItem);
}

//dealing with premium membership

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
          displayPremiumStatus(true)
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

function displayPremiumStatus(isPremium) {
  if(isPremium===true){
    const premiumTag=document.getElementById('successMessage');
    document.getElementById('rzp-button1').style.display = 'none';
    premiumTag.innerHTML='You are a Premium User';

    const lbButton = document.createElement('button');
    lbButton.textContent = 'Leader Board';
    lbButton.onclick = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/premium/leaderBoard', { headers: { "Authorization": token } });
        
        const lbHeading = document.getElementById('lbHeading');

        const lbList = document.getElementById('lbList');

        lbList.innerHTML = '';

        response.data.forEach(user => {
          const listItem = document.createElement('li');
          listItem.textContent = `${user.username}: ${user.totalCost}`;
          lbList.appendChild(listItem);
        });
        lbHeading.style.display = 'block';

      } catch (error) {
        console.error('leader board failed:', error);
      }
    };
    premiumTag.appendChild(lbButton)
  }else{
    document.getElementById('successMessage').innerHTML = 'You are not a Premium User';
    lbHeading.style.display = 'none';
    lbList.innerHTML = '';
  }
}