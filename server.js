const express = require('express');
const app = express();

const parth = require('path');
//Init Middleware

app.use(express.json({ extended: false }));

//Define Route
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

//Server Static assest in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  appu.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
