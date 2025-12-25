const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'EcoPantry API is running 🚀' });
});

module.exports = app;