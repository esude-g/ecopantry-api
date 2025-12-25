const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pantryRoutes = require('./routes/pantryRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pantry', pantryRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'EcoPantry API is running 🚀' });
});

module.exports = app;