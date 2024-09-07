const express = require('express');
const app = express();
require('dotenv').config();
const { connectDB } = require('./conn');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});

