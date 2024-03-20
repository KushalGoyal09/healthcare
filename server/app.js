const express = require('express');
const connect = require('./db/connect');
const notFound = require('./middleware/not-Found');
const errorHandler = require('./middleware/error-Handler');
const cors = require('cors');
const app = express();
require('express-async-errors');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/register', require('./routes/register'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/search', require('./routes/search'));
app.use('/api/doctor', require('./routes/doctor-details'));
app.use('/api/appointment', require('./routes/book-appointment'));
app.use('/api/userinfo', require('./routes/user-info'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log('Server is listening on port ' + port);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
