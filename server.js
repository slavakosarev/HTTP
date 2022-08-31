/**
 **При обращении к эндпоинту «/redirect» лучше использовать в ответе код 301 («Moved Permanently») вместо 200 («OK»), а также использовать заголовок Location
**Если маршрут найден, но использован неверный метод, то сервер должен отвечать кодом 405 — в вашей же реализации такой случай не учтен (подсказка: разделите условие с проверкой маршрута и метода запроса на два отдельных условия и у вас не будет ошибки после каждого запроса)
**Не хватает обработки ошибки чтения директории с файлами (сервер должен отдавать код 500 в данном случае)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const host = 'localhost';
const port = 8000;

const requestListener = (req, res) => {

   if (req.url === '/get') {
      if (req.method === 'GET') {
         let list = [];
         let files = '';

         res.writeHead(200, 'OK');
         try {
            fs.readdirSync('./files').forEach(file => {
               if (path.extname(file) == '.txt') {
                  list.push(file);
               }
               files = list.join();
            })
            res.end(`${files}`);
         } catch (error) {
            res.writeHead(500, 'Internal Server Error');
            res.end(`${error}`);
         }
      } else {
         res.writeHead(405, 'Method Not Allowed');
         res.end('HTTP method not allowed');
      }

   } else if (req.url === '/delete' && req.method === 'DELETE') {
      res.writeHead(200, 'OK');
      res.end('Success!');
   } else if (req.url === '/post' && req.method === 'POST') {
      res.writeHead(200, 'OK');
      res.end('Success!');
   } else if (req.url === '/redirect' && req.method === 'GET') {
      res.writeHead(301, 'Moved Permanently', {
         'Location': '/redirect',
      });
      res.end(`Server is available on http://${host}:${port}/redirected`);
   } else {
      res.writeHead(405, 'Method Not Allowed');
      res.end('HTTP method not allowed');
   }
};
const server = http.createServer(requestListener);

server.listen(port, host, () => {
   console.log(`Server is running on http://${host}:${port}`);
});