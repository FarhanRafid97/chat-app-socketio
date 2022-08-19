const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes');
const messageRouter = require('./routes/messageRouter');
const socket = require('socket.io');
require('dotenv').config();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api/auth', router);
app.use('/api/messages', messageRouter);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err.message));
const server = app.listen(process.env.PORT, () =>
  console.log(`sever listen to posrt ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });
});
