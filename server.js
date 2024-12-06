var express = require('express');
var serveStatic = require('serve-static');

const port = process.env.PORT || 8081;

const app = express();
app.use(serveStatic(__dirname + "/dist"));

app.listen(port, () => {
   console.log(`Server running at port ${port}`);
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
    console.log('Received GET request to /health endpoint');
});