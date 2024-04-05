exports.getContact=(req, res,next) => {
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
                <h1>Enter the name and email id</h1>
                <form action="/success">
                    <label for="name">Name:</label>
                    <input id="name" type="text" name="name"><br><br>
                    <label for="email">Email:</label>
                    <input id="email" type="text" name="email"><br><br>
                    <button type="submit">submit</button>
                </form>
            </body>
        </html> 
    `);
}

exports.getSuccess=(req, res,next) => {
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
                <h1>Form successfuly filled</h1>
            </body>
        </html> 
    `);
}