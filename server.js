import express from 'express';

const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
