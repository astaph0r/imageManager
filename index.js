const express = require('express');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: '.env' });


mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology : true}, { useFindAndModify: false})
.then(() => console.log('Connected to MongoDB'))
.catch('error', (err) => {
  console.log("Couldn't connect to MongoDB", err.message);
});


app.use('/', routes);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('We have a server running on PORT: ' + PORT);
});