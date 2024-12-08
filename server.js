var express = require('express');
var serveStatic = require('serve-static');

const port = process.env.PORT || 8081;

const app = express();
app.use(serveStatic(__dirname + "/dist"));

app.get('*', (req, res) => {
    // Читаем index.html
    let indexHTML = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
    
    // Заменяем плейсхолдер на значение из переменных окружения
    const integratorUrl = process.env.VITE_INTEGRATOR_API_URL || 'http://localhost:3000'; 
    indexHTML = indexHTML.replace('%%VITE_INTEGRATOR_API_URL%%', integratorUrl);
    
    // Отдаем клиенту уже "настроенный" HTML
    res.send(indexHTML);
});

app.listen(port, () => {
   console.log(`Server running at port ${port}`);
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
    console.log('Received GET request to /health endpoint');
});