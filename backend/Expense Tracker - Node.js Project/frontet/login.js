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
            console.log(response);
            if (response.status === 200) {
                // Login successful
                message.textContent = response.data.message;
                // Redirect or perform other actions upon successful login
            } else {
                // Handle specific error cases
                if (response.status === 401) {
                    // Incorrect password
                    message.textContent = 'Incorrect password';
                } else if (response.status === 404) {
                    // User not found
                    message.textContent = 'User not found';
                } else {
                    // Other unexpected errors
                    message.textContent = 'An error occurred. Please try again.';
                }
            }
            
            
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors or other exceptions
            message.textContent = 'An error occurred. Please try again.';
        }
    });
});