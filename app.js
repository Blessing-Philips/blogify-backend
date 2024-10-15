const express = require('express');
const dotenv = require('dotenv');


const db = require('./database/database');
const User = require('./models/user.model');
const auth = require('./routes/auth.route');

const app = express();

dotenv.config();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home');
    console.log('Home')
});
app.use('/api/', auth);

// A middleware that handles every error
app.use((err, req, res, next) => {
    let statusCode = err.status || 500;
    let errorMessage = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        errorMessage
    });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});