const http = require('http');
const fs = require('fs');
const path = require('path');

const host = 'localhost';
const port = 8000;

const requestListener = (req, res) => {

   if (req.url === '/get' && req.method === 'GET') {
      let list = [];
      let files = '';

      res.writeHead(200);
      fs.readdirSync('./files').forEach(file => {
         if (path.extname(file) == '.txt') {
            list.push(file);
         }
         files = list.join();
      });
      res.end(`${files}`);


   } else if (req.url === '/delete' && req.method === 'DELETE') {
      res.writeHead(200);
      res.end('Success!');
   } else if (req.url === '/post' && req.method === 'POST') {
      res.writeHead(200);
      res.end('Success!');
   } else if (req.url === '/redirect' && req.method === 'GET') {
      res.writeHead(200);
      res.end(`Server is available on http://${host}:${port}/redirected`);
   };

   res.writeHead(405);
   res.end('HTTP method not allowed');

};
const server = http.createServer(requestListener);

server.listen(port, host, () => {
   console.log(`Server is running on http://${host}:${port}`);
});