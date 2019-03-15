const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');

app.use(volleyball);

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(1337, () => {
  console.log('listening on port 1337');
});
