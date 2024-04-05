const express=require('express');
const fs = require('fs');

const router=express.Router();

router.get('/', (req, res) => { 
    fs.readFile('message.txt', 'utf8', (err, data) => {
        res.send(`
            <html>
                <body>
                    <h1>Enter the message...</h1>
                    <p>${data}</p>
                    <form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST">
	                    <input id="message" type="text" name="message">
                        <input type="hidden" name="username" id="username">
                        <button type="submit">send</button>
                    </form> 
                </body>
            </html>
        `);
    });
});

 
router.post('/', (req, res) => {
    fs.writeFile('message.txt', `${req.body.username}: ${req.body.message} `, {flag : 'a'}, (err) => {
        res.redirect('/');
    });
});

// router.post('/', (req, res) => {
//     fs.appendFile('message.txt', `${req.body.username}: ${req.body.message} `, (err) => {
//         res.redirect('/');
//     });
// });

module.exports=router;
