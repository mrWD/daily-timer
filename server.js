const express = require('express');
const app = express();

app.use((req, res, next) => {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }

  next();
});

app.use(express.static('./dist/daily-timer'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/daily-timer/' });
});

app.listen(process.env.PORT || 8080);
