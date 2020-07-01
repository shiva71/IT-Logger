const express = require('express');
const app = express();
//Init Middleware

app.use(express.json({ extended: false }));

//Define Route
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
