const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const model = require('./model');
const Chat = model.getModel('chat');

// work with express
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
	socket.on('sendmsg', (data) => {
		const { from , to , msg } = data;
		const chatId = [from,to].sort().join('_');
		Chat.create({ chatId, from, to, content: msg }, (err, doc) => {
			// console.log(doc._doc)
			io.emit('recvmsg', Object.assign({}, doc._doc));
		})
	})
})

const userRouter = require('./user');
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

//改成server 使得express和socket绑定
server.listen(9093, () => {
	console.log('listening at 127.0.0.1:9093');
})