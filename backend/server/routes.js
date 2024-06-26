const fs = require('fs');

const requestHandler=(req,res)=>{
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        fs.readFile('message.txt',{encoding: 'utf-8'},(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                res.write('<html>')
                res.write('<head><title>Enter Message</title><head>')
                res.write('<body>')
                res.write(`<p>${data}</p>`)
                res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form>')
                res.write('</body>')
                res.write('</html>')
                return res.end() 
            }
        })
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message,(err)=>{
                if(err){
                    console.log(err);
                } else {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                }
            }); 
        })
    } else {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>')
        res.write('<head><title>My First Page</title><head>')
        res.write("<body><h1>Welcome to my Node Js project</h1></body>")
        res.write('</html>')
        res.end()
    }
}

module.exports=requestHandler;