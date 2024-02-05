const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage });

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      switch (req.url) {
        case '/':
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('This is Home Page');
          break;
        case '/about':
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('This is About Page');
          break;
        case '/contact':
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('This is Contact Page');
          break;
        case '/file-write':
          fs.writeFile('./demo.txt', 'hello world', 'utf-8', (err) => {
            if (err) {
              res.status(500).send('Error writing file');
            } else {
              res.end('File written successfully!');
            }
          });
          break;
        default:
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not found');
          break;
      }
      break;

    case 'POST':
      switch (req.url) {
        case '/upload-file':
          upload.single('file')(req, res, (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal Server Error');\
              
            } else {
              const { filename, originalname } = req.file;
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              res.end(
                `File uploaded successfully! Filename: ${filename}, Original name: ${originalname}`
              );
            }
          });

          break;

        default:
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not found');
          break;
      }

      break;

    default:
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method not allowed');
      break;
  }
});

const PORT = 5500;
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
