const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
const projectRoutes = require('./routes/projectRoutes');
const articleRoutes = require('./routes/articleRoutes');
const profileRoutes = require('./routes/profileRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/projects', projectRoutes);
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));