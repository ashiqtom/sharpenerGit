const baseURL = 'http://localhost:3000/user'; 

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        try {
            const response = await axios.get(`${baseURL}/login/${email}/${password}`);
        
            if (response.status === 200 && response.data.message === 'Login successful') {
                message.textContent = 'Login successful!';
            } else {
                message.textContent = response.data.message || 'Login failed. Please check your credentials.';
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 404) {
                message.textContent = 'Invalid email or password. Please try again.';
            } else {
                message.textContent = 'An error occurred. Please try again.';
            }
        }
                
    });
});