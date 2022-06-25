var express = require('express');
var path = require('path');

const app = express();
const port = 5000;

const usersRouter = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
