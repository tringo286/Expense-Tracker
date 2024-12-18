const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const { connectDB } = require("./db")
const expense = require('./routes/expense.route')
const user = require('./routes/user.route')

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 3000;;

app.use('/api/expense', expense);
app.use('/', user);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})
