const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors') //cross origin resource sharing
const cookieparser = require('cookie-parser');
require('dotenv').config();

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));

const app = express();
const port = process.env.PORT || 5000;

const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
const stockQueryRouter = require('./routes/stockquery');

app.use(express.json());
app.use("/", cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(cookieparser());


app.use('/users', usersRouter.routes);
app.use('/groups', usersRouter.HasToken, groupsRouter);
app.use('/stockquery', usersRouter.HasToken, stockQueryRouter) //remove hastoken when testing using postman

// var server =
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`)
//     // app.emit("app started");
// });

if(require.main === module){
    app.listen(port, () =>
      console.log(`Server started on port ${port}`),
    );
  }


// module.exports = server;

module.exports = app;
