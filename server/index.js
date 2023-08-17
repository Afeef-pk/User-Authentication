const express = require('express')
const cors = require('cors')
require('dotenv').config();
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler')
const userRoutes = require('./routes/user')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/public/products/', express.static(path.join(__dirname, 'public/products')));

app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials:true,
    methods: ['GET', 'POST']
}))

app.use('/api',userRoutes)

app.use(errorHandler)

const server = app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = server