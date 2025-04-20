const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;
const colors = require('colors')
const connectDB = require('./config/db')

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Any route that is not api will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}` ));