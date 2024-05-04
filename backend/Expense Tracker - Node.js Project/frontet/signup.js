const baseURL = 'http://localhost:3000'; 
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await axios.post(`${baseURL}/signup`, data);
            message.textContent = 'Sign up successful!';
            form.reset();
        } catch (error) {
            message.textContent = 'Sign up failed. Please try again.';
            console.error('Error:', error);
        }
    });
});
