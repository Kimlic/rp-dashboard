
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https')
    res.redirect('http://' + req.hostname + req.url);
  else
    next();
});
app.use(express.static('dist'));
app.listen(PORT, 'localhost', function(err) {
  console.log(err ? err : 'Listening at http://localhost:' + PORT);
});