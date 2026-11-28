console.log("Start");

setTimeout(() => {
    console.log("Hello World 1...");
}, 2000);

setTimeout(() => {
    console.log("Hello World 2...");
}, 0);



Promise.resolve().then(() => {
    console.log("Calling Promise");
});



const os = require('os');

// console.log(os.freemem());
// console.log(os.hostname());



const fs = require('fs');


fs.writeFile('Data.txt', 'Hello World', (err) => {
    if (err) throw err;
    console.log("File Created");

    
    fs.readFile('Data.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(data);

       
        fs.appendFile('Data.txt', '\nAdding Express js', (err) => {
            if (err) throw err;
            console.log("File Updated");

            
            fs.unlink('Data.txt', (err) => {
                if (err) throw err;
                console.log("File Deleted...");
            });
        });
    });
});



const http = require('http');

const PORT = 5000;

const domain = http.createServer((req, res) => {

    console.log(req.url);

    
    if (req.url === '/home') {

        fs.readFile('home.html', 'utf-8', (err, data) => {

            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
                return;
            }

            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end(data);

        });

    }

    
    else if (req.url === '/contact') {

        fs.readFile('contact.html', 'utf-8', (err, data) => {

            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
                return;
            }

            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end(data);

        });

    }

  
    else if (req.url === '/about') {

        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;

        res.end(`
            <h1>Welcome to About Page</h1>
            <p>Learn more about us.</p>
        `);

    }

   
    else if (req.url === '/product') {

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

        res.end(JSON.stringify({
            "product id": 100,
            "product name": "Laptop",
            "price": 50000,
            "category": "Electronics"
        }));

    }

    else {

        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;

        res.end("404 Error - Page Not Found");

    }

});

domain.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});

