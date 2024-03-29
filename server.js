const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const database = [
  {
    name: 'Tea Chats',
    id: 0,
    users: ['Ryan', 'Nick', 'Danielle'],
    messages: [
      { name: 'Ryan', message: 'ayyyyy', id: 'gg35545' },
      { name: 'Nick', message: 'lmao', id: 'yy35578', reactions: null },
      { name: 'Danielle', message: 'leggooooo', id: 'hh9843' },
    ],
  },
  {
    name: 'Coffee Chats',
    id: 1,
    users: ['Jessye'],
    messages: [{ name: 'Jessye', message: 'ayy', id: 'ff35278' }],
  },
];

const findRoom = (roomId) => {
  const room = database.find((room) => {
    return room.id === parseInt(roomId);
  });
  if (room === undefined) {
    return { error: `a room with id ${roomId} does not exist` };
  }
  return room;
};

const findMessageIndex = (room, messageId) => {
  const messageIndex = room.messages.findIndex((message) => {
    return message.id === messageId;
  });
  return messageIndex;
};

const logUser = (room, username) => {
  const userNotLogged = !room.users.find((user) => {
    return user === username;
  });

  if (userNotLogged) {
    room.users.push(username);
  }
};

router.get('/rooms', function (req, res) {
  const rooms = database.map((room) => {
    return { name: room.name, id: room.id };
  });
  console.log('Response:', rooms);
  res.json(rooms);
});

router.get('/rooms/:roomId', function (req, res) {
  room = findRoom(req.params.roomId);
  if (room.error) {
    console.log('Response:', room);
    res.json(room);
  } else {
    console.log('Response:', {
      name: room.name,
      id: room.id,
      users: room.users,
    });
    res.json({ name: room.name, id: room.id, users: room.users });
  }
});

router
  .route('/rooms/:roomId/messages')
  .get(function (req, res) {
    room = findRoom(req.params.roomId);
    if (room.error) {
      console.log('Response:', room);
      res.json(room);
    } else {
      console.log('Response:', room.messages);
      res.json(room.messages);
    }
  })
  .post(function (req, res) {
    room = findRoom(req.params.roomId);
    if (room.error) {
      console.log('Response:', room);
      res.json(room);
    } else if (!req.body.name || !req.body.message) {
      console.log('Response:', { error: 'request missing name or message' });
      res.json({ error: 'request missing name or message' });
    } else {
      logUser(room, req.body.name);
      const messageObj = {
        name: req.body.name,
        message: req.body.message,
        id: shortid.generate(),
      };
      room.messages.push(messageObj);
      console.log('Response:', { message: 'OK!' });
      res.json(messageObj);
    }
  });

router.post('/rooms/:roomId/messages/:messageId', (req, res) => {
  const room = findRoom(req.params.roomId);
  const messageIndex = findMessageIndex(room, req.params.messageId);
  const messageToReactTo = room.messages[messageIndex];
  messageToReactTo.reaction = !messageToReactTo.reaction
    ? 1
    : ++messageToReactTo.reaction;
  res.json(messageToReactTo);
});

router.delete('/rooms/:roomId/messages/:messageId', (req, res) => {
  const room = findRoom(req.params.roomId);
  const messageIndex = findMessageIndex(room, req.params.messageId);
  const messageToReactTo = room.messages[messageIndex];
  messageToReactTo.isDeleted = true;
  res.json(messageToReactTo);
});

app.use('/api', router);
app.listen(port);
console.log(`API running at localhost:${port}/api`);
