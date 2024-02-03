import Express from 'express';

const server = Express();

server.get('/', function (req, res) {
    return res.status(200).json({ message: "Hei" });
}).listen(3000);

console.log('Server berjalan pada http://localhost:3000/');