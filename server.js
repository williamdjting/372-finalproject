import express from 'express';

const app = express();
const port = 5000;

app.get('/example', (req, res) => {
    res.json({ "message": "Message from the server!" });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
