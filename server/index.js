
const express = require('express');
const app = express();

const URI = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 4010;

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https')
    res.redirect('http://' + req.hostname + req.url);
  else
    next();
});
app.use(express.static('dist'));
app.listen(PORT, URI, function(err) {
  console.log(err ? err : 'Listening at http://' + URI + ':' + PORT);
});