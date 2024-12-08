const fs = require('fs');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');

const port = process.env.PORT || 8081;
const distDir = path.join(__dirname, 'dist');

const app = express();

// Перехватываем запрос к index.html
app.get('*', (req, res, next) => {
  // Путь к index.html
  const indexPath = path.join(distDir, 'index.html');

  // Проверяем, если запрашиваемый файл не index.html, пропускаем дальше
  if (!req.path.endsWith('/') && !req.path.endsWith('.html') && req.path !== '/') {
    return next();
  }

  let indexHTML = fs.readFileSync(indexPath, 'utf8');
  
  const integratorUrl = process.env.VITE_INTEGRATOR_API_URL || 'http://localhost:3000'; 
  console.log('Replacing with:', integratorUrl);

  indexHTML = indexHTML.replace('%%VITE_INTEGRATOR_API_URL%%', integratorUrl);
  
  res.send(indexHTML);
});

// Теперь отдаём статику
app.use(serveStatic(distDir));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
  console.log('Received GET request to /health endpoint');
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
