const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));

const app = express();
const port = 5000;

const usersRouter = require('./routes/users');
const stockQueryRouter = require('./routes/stockquery');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/users', usersRouter.routes);
app.use('/stockquery', stockQueryRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
