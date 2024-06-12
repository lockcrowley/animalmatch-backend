require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');

const router = require('./routes');
const connectDB = require('./database/connection');
const cancelExpired = require('./services/ProcessService')

const port = process.env.PORT || 3333;

connectDB();

cron.schedule('0 0 * * *', () => {
  cancelExpired.cancelExpiredAdoptionProcessesService();
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(router);

app.listen(port, () => console.log('Server On, port ' + port));
