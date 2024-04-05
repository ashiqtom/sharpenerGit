const express=require('express');

const router=express.Router();

router.get('/login', (req, res) => {
    res.send(`
        <html> 
            <header>
                <nav>
                    <ul>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/login">login</a></li>
                        <li><a href="/">message</a></li>
                    </ul>
                </nav>
            </header>
            <body>
                <h1>Login to your account</h1>
                <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/">
                    <input id="username" type="text" name="username">
                    <button type="submit">Login</button>
                </form>
            </body>
        </html>
    `);
});

module.exports=router;