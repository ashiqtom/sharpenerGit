const baseURL = 'http://localhost:3000/user'; 

const form = document.getElementById('loginForm');

form.addEventListener('submit', async function(event) {
    try {
        event.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        const response = await axios.get(`${baseURL}/login/${email}/${password}`);
        alert(response.data.message)
        localStorage.setItem('token',response.data.token)
        window.location.href = '../expense/expense.html';  
    } catch (err) {
        console.log(JSON.stringify(err.response.data.err))
        document.body.innerHTML += `<div style="color:red;">${err.response.data.err} <div>`;
    }
});
