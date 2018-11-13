
var app = require('express')();
var server = require('http').Server(app);
const dbase = require('./connection/connect.js');
let functions = require('./push.js');

let port = 2000;

server.listen(port, function () {
  console.log('server has started');
});

app.get('/bulkNotifications', async function (req, res) {
  let final = await functions.BulkNotifications();
  res.send(final)
});


async function start() {

  try {
    await dbase.MongoStart();

  } catch (error) {
    throw error;
  }
};


start();
