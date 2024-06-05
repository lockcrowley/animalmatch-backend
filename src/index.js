require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const router = require('./routes');
const connectDB = require('./database/connection');

const port = process.env.PORT || 3333;

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(router);

app.listen(port, () => console.log('Server On, port ' + port));
