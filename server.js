const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { url } = require('inspector');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = 3000;

//active users array
let users = [];

const addUSer = (socketId, data) => {
  !users.some((user) => user.data.uid === data.uid) &&
    users.push({ socketId, data });
};

const editUser = (socketId, data) => {
  users = users.map((user) =>
    user.data.uid === data.uid ? { socketId, data } : user
  );
};

const removeUser = (uid) => {
  users = users.filter((user) => user.data.uid !== uid);
};

const getUser = (uid) => {
  return users.find((user) => user.data.uid === uid);
};

io.on('connect', (socket) => {
  socket.on('active', (data) => {
    addUSer(socket.id, data);
    socket.broadcast.emit('userSignIn', {
      uid: data.uid,
      active: true,
    });
  });
  socket.on('reconnect', (user) => {
    addUSer(socket.id, user);
    editUser(socket.id, user);
  });
  socket.on('start chat', ({ room, receiverId }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit('startChat', room);
  });
  //user sending message
  socket.on('send-message', (message) => {
    const receiver = getUser(message.receiverUid);
    const sender = getUser(message.senderUid);
    io.to(receiver.socketId).to(sender.socketId).emit('chat', message);
  });

  socket.on('isTyping', ({ uid, isTyping }) => {
    const user = getUser(uid);
    io.to(user.socketId).emit('typing', isTyping);
  });

  //when the user exits the room
  socket.on('inactive', (uid) => {
    //the user is deleted from array of users and a left room message displayed
    removeUser(uid);
    socket.broadcast.emit('userSignOut', {
      uid,
      active: false,
    });
    // if (p_user) {
    //   io.to(p_user.room).emit('message', {
    //     userId: p_user.id,
    //     username: p_user.username,
    //     text: `${p_user.username} has left the room`,
    //     isTyping: false,
    //     isActive: false,
    //   });
    // }
  });
});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  app.post('*', (req, res) => {
    return nextHandler(req, res);
  });

  app.patch('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Running on http://localhost:${port}`);
  });
});
