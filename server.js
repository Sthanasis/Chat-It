const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = 3000;

io.on('connect', (socket) => {
  console.log('connected');
  socket.on('active', () => {
    //* create user
    // const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, '=id');
    // socket.join(p_user.room);
    socket.join();

    //display a welcome message to the user who have joined a room
    // socket.emit('message', {
    //   userId: p_user.id,
    //   username: p_user.username,
    //   text: `Welcome ${p_user.username}`,
    //   isTyping: false,
    //   isActive: true,
    // });

    //displays a joined room message to all other room users except that particular user
    // socket.broadcast.to(p_user.room).emit('message', {
    //   userId: p_user.id,
    //   username: p_user.username,
    //   text: `${p_user.username} has joined the chat`,
    //   isTyping: false,
    //   isActive: true,
    // });
  });

  //user sending message
  socket.on('chat', (text) => {
    //gets the room user and the message sent
    // const p_user = get_Current_User(socket.id);
    console.log(socket.id);
    // io.to(p_user.room).emit('message', {
    //   userId: p_user.id,
    //   username: p_user.username,
    //   text: text,
    //   isTyping: false,
    //   isActive: true,
    // });
  });

  socket.on('typing', (isTyping) => {
    console.log(socket.id);

    // io.to(p_user.room).emit('message', {
    //   userId: p_user.id,
    //   username: p_user.username,
    //   text: text,
    //   isTyping: true,
    //   isActive: true,
    // });
  });

  //when the user exits the room
  socket.on('inactive', () => {
    //the user is deleted from array of users and a left room message displayed
    console.log(socket.id);
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

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Running on http://localhost:${port}`);
  });
});
