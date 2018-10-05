const express = require('express');

const configureMiddleware = require('./config/middleware.js');
const userRoutes = require('./users/userRoutes.js');

const server = express();

// middleware (order matters)
configureMiddleware(server);

function validate(req, res, next) {
  const name = req.body.name;

  if (name) {
    next();
  } else {
    next('u12');
  }
}

server.use('/users', userRoutes);

server.get('/posts', (req, res) => {
  res.send('GET /posts endpoint');
});

server.get('/posts/:id', (req, res) => {
  res.send('GET /posts/:id endpoint');
});

server.get('/posts/:id/posts', (req, res) => {
  res.send('GET /posts/:id/posts endpoint');
});

server.post('/posts', (req, res) => {
  res.send('POST /posts endpoint');
});

server.put('/posts/:id', (req, res) => {
  res.send('PUT /posts/:id endpoint');
});

server.delete('/posts/:id', (req, res) => {
  res.send('DELETE /posts/:id endpoint');
});

server.get('/friends', (req, res) => {
  res.send('GET /friends endpoint');
});

server.get('/friends/:id', (req, res) => {
  res.send('GET /friends/:id endpoint');
});

server.get('/friends/:id/friends', (req, res) => {
  res.send('GET /friends/:id/friends endpoint');
});

server.post('/friends', (req, res) => {
  res.send('POST /friends endpoint');
});

server.put('/friends/:id', (req, res) => {
  res.send('PUT /friends/:id endpoint');
});

server.delete('/friends/:id', (req, res) => {
  res.send('DELETE /friends/:id endpoint');
});

// route handlers (are middleware!)
server.post('/hello', validate, (req, res, next) => {
  const name = req.body.name;

  res.status(200).json({ hello: name });
});

server.use(errorHandler); // <<<<< key <<<<<<<

function errorHandler(err, req, res, next) {
  console.log('handling error');
  const errors = {
    u12: {
      httpCode: 422,
      title: 'Required Field',
      description: 'The name must be specified',
      recoveryInstructions: 'Please provide a name and try again',
      icon: 'error.svg',
    },
    u13: {
      message: 'The email provide already exists',
    },
    u401: {
      httpCode: 401,
      message: 'You are not logged in, please login and try again',
    },
    u403: {
      message: 'You have no access to this information',
    },
    s00: {
      message: 'Unknown Sever Error',
    },
  };

  const error = errors[err]; // get from file/fs/db
  res.status(error.httpCode).json(error);
}

// start the server
const port = process.env.PORT || 9000;
server.listen(port, () =>
  console.log(`\n== API running on http://localhost:${port} ==\n`)
);
